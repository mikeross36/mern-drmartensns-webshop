import { Request, Response, NextFunction } from "express";
import {
  RegisterUserInput,
  VerifyUserInput,
  LoginUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  UpdatePasswordInput,
} from "../schemas/authSchema";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../utils/options";
import { createUser, findUser, findUserById } from "../services/userService";
import { generateToken } from "../services/authService";
import { User } from "../models/userModel";
import config from "config";
import Email from "../utils/mailer";
import { MongoError } from "mongodb";
import crypto from "crypto";
import { verifyJwt, signJwt } from "../utils/jwtUtils";
import redisClient from "../utils/connections/connectRedis";
import { logger } from "../utils/logger";

const devOrigin = config.get("devOrigin");
const prodOrigin = config.get("prodOrigin");

export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserInput>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await createUser(req.body);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Bad request. Invalid data passed" });
    }
    const verificationString = user.createVerificationCode();
    user.save({ validateBeforeSave: false });

    const url =
      process.env.NODE_ENV === "development"
        ? `${devOrigin}/verify/${user._id}/${verificationString}`
        : `${prodOrigin}/verify/${user._id}/${verificationString}`;

    try {
      await new Email(user as unknown as User, url).sendWelcomeEmail();
      return res.status(201).json({
        status: "success",
        message:
          "User successfully registered. Check your email to verify account",
        data: { user },
      });
    } catch (err) {
      user.verificationCode = null;
      await user.save();
      return res.status(5000).json({
        message: "There was en error sending email. Please try again later",
      });
    }
  } catch (err) {
    if (err instanceof MongoError && err.code === 11000) {
      return res.status(409).json({
        status: "failed",
        message: "Conflict. Account already exists",
      });
    }
    return next(err);
  }
}

export async function verifyUserHandler(
  req: Request<VerifyUserInput, {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const verificationCode = crypto
      .createHash("sha256")
      .update(req.params.verificationString)
      .digest("hex");

    const user = await findUser({ verificationCode });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.userVerified) {
      return res
        .status(400)
        .json({ message: "Bad request. User's account already verified" });
    }
    user.userVerified = true;
    user.verificationCode = null;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Account verified successfully. Please login to continue",
    });
  } catch (err) {
    return next(err);
  }
}

export async function loginUserHandler(
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await findUser({ email: req.body.email });
    if (!user || !(await user.matchPasswords(req.body.password))) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Invalid email or password" });
    }
    if (user.userVerified === "false") {
      return res
        .status(401)
        .json({ message: "User's account is not verified" });
    }
    const { accessToken, refreshToken } = generateToken(user as Partial<User>);

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
    res.cookie("loggedIn", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });
    return res.status(200).json({
      status: "success",
      message: "Logged In Successfully",
      accessToken,
    });
  } catch (err) {
    return next(err);
  }
}

export async function refreshAccessTokenHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const refreshToken = req.cookies.refreshToken;
    const verified = verifyJwt<{ sub: string }>(
      refreshToken,
      "refreshTokenPublicKey"
    );
    if (!verified) {
      return res
        .status(403)
        .json({ message: "Forbiden. Refresh token not verified" });
    }
    const session = await redisClient.get(verified.sub);
    if (!session) {
      return res
        .status(403)
        .json({ message: "Forbiden. User session not available" });
    }
    const user = await findUserById(JSON.parse(session)._id);
    if (!user) {
      return res
        .status(403)
        .json({ message: "Forbiden. User do not have access rights" });
    }
    const accessToken = signJwt({ sub: user._id }, "accessTokenPrivateKey", {
      expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
    });
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("loggedIn", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });
    return res.status(200).json({ status: "success", accessToken });
  } catch (err) {
    return next(err);
  }
}

function logout(res: Response) {
  res.clearCookie("accessToken", {
    expires: new Date(
      Date.now() + config.get<number>("accessTokenExpiresIn") * 1
    ),
    maxAge: 1,
    httpOnly: true,
  });
  res.clearCookie("refreshToken", {
    expires: new Date(
      Date.now() + config.get<number>("refreshTokenExpiresIn") * 1
    ),
    maxAge: 1,
    httpOnly: true,
  });
  res.cookie("loggedIn", "", {
    maxAge: 1,
  });
}

export async function logoutUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = res.locals.user;
    if (!user || !user._id) {
      return res.status(400).json({
        status: "error",
        message: "Bad request. User info is invalid or missing",
      });
    }
    try {
      await redisClient.del(user._id.toString());
    } catch (err) {
      if (err instanceof Error) {
        logger.error(
          `Client closed. Redis error during logout: ${err.message}`
        );
        return res.status(500).json({
          status: "error",
          message: "Error occurred while clearing the session",
        });
      }
      throw err;
    }
    try {
      logout(res);
      return res.status(200).json({ status: "success", message: "LOGGED OUT" });
    } catch (err: any) {
      logger.error(`Error sending response cookies: ${err.message}`);
      return res
        .status(500)
        .json({ status: "error", message: "Error occurred while logout" });
    }
  } catch (err) {
    return next(err);
  }
}

export async function forgotPasswordHandler(
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await findUser({ email: req.body.email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "Forbiden. There is no user with this email" });
    }
    if (!user.userVerified) {
      return res
        .status(403)
        .json({ message: "Forbiden. User's account not is verified" });
    }
    const resetString = user.createResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl =
      process.env.NODE_ENV === "development"
        ? `${devOrigin}/reset-password/${resetString}`
        : `${prodOrigin}/reset-password/${resetString}`;

    try {
      await new Email(user as unknown as User, resetUrl).sendPasswordReset();
      return res.status(200).json({
        status: "success",
        message: "Password reset token sent by email",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetAt = undefined;
      await user.save();

      return res
        .status(500)
        .json({ message: "There was an error sending email" });
    }
  } catch (err) {
    return next(err);
  }
}

export async function resetPasswordHandler(
  req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(req.params.resetString)
      .digest("hex");

    const user = await findUser({
      passwordResetToken: passwordResetToken,
    });
    if (!user) {
      return res
        .status(403)
        .json({ message: "Forbiden. Token is invalid or expired" });
    }
    try {
      user.password = req.body.password;
      user.passwordResetToken = null;
      user.passwordResetAt = null;
      await user.save();
      return res.status(200).json({
        status: "success",
        message: "Password successfully reset. Please login with new password",
      });
    } catch (err: any) {
      logger.error(`Error saving data after password reset: ${err.message}`);
      return res
        .status(500)
        .json({ message: "Error while resetting password" });
    }
  } catch (err) {
    return next(err);
  }
}

export async function updatePasswordHandler(
  req: Request<{}, {}, UpdatePasswordInput>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = res.locals.user;
    if (!user || !(await user.matchPasswords(req.body.currentPassword))) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Invalid current password" });
    }
    try {
      user.password = req.body.password;
      await user.save();
      return res.status(200).json({
        status: "success",
        message:
          "Password updated successfully. Please login with new password",
      });
    } catch (err: any) {
      logger.error(`Error saving data after password update: ${err.message}`);
      return res.status(500).json({ message: "Error while updating password" });
    }
  } catch (err) {
    return next(err);
  }
}
