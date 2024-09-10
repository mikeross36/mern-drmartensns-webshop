import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwtUtils";
import redisClient from "../utils/connections/connectRedis";
import { findUserById } from "../services/userService";

export async function tokenProtect(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let accessToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      accessToken = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.accessToken) {
      accessToken = req.cookies.accessToken;
    }
    if (!accessToken) {
      return res.status(401).json({ message: "You are not logged in!" });
    }

    const verified = verifyJwt<{ sub: string }>(
      accessToken,
      "accessTokenPublicKey"
    );
    if (!verified) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const session = await redisClient.get(verified.sub);
    if (!session) {
      return res.status(401).json({ message: "User session has expired" });
    }

    const user = await findUserById(JSON.parse(session)._id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User with this token no longer exists" });
    }

    req.user = user as { _id: string };
    res.locals.user = user as { _id: string };
    return next();
  } catch (err) {
    return next(err);
  }
}
