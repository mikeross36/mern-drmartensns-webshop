import { Request, Response, NextFunction } from "express";
import {
  findAllUsers,
  findUserById,
  findUserAndDelete,
  findUserAndUpdate,
} from "../services/userService";
import { GetUserInput } from "../schemas/userSchema";
import redisClient from "../utils/connections/connectRedis";
import { logger } from "../utils/logger";

export function getUserInfo(req: Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user;
    return res.status(200).json({ status: "succes", data: { user } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function getAllUsersHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await findAllUsers();
    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }
    return res
      .status(200)
      .json({ status: "success", result: users.length, data: { users } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknow error occurred"));
  }
}

export async function getUserHandler(
  req: Request<GetUserInput>,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.userId || typeof req.params.userId !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Bad request. Invalid user's ID" });
    }
    const user = findUserById(req.params.userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    return res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

function filterObj(obj: Record<string, any>, ...allowedFields: string[]) {
  const newObj: Record<string, any> = {};
  const fieldNames = Object.keys(obj);
  fieldNames.forEach(function (key) {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

// export async function updateUserAccountHandler(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const filteredBody = filterObj(req.body, "userName", "email");
//     if (req.file) {
//       filteredBody.photo = req.file.filename;
//     }
//     const updatedUser = await UserModel.findByIdAndUpdate(
//       res.locals.id,
//       filteredBody,
//       { new: true }
//     );
//     return res.status(200).json({ data: { user: updatedUser } });
//   } catch (err) {
//     if (err instanceof Error) {
//       next(err);
//     }
//     return next(new Error("An unknown error occured"));
//   }
// }

export async function updateUserAccountHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info(req);
    const user = await findUserById(req.user._id);
    if (!user) {
      return res
        .status(400)
        .json({ status: "errro", message: "Failed to update user's account" });
    } else {
      user.userName = req.body.userName || user.userName;
      user.email = req.body.email || user.email;
      user.photo = req.file?.filename || user.photo;

      const updatedUser = await user.save();
      return res.status(200).json({
        status: "success",
        message: "User's account successfully updateted",
        _id: updatedUser._id,
        userName: updatedUser.userName,
        email: updatedUser.email,
        photo: updatedUser.photo,
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function deleteUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.userId || typeof req.params.userId !== "string") {
      return res.status(400).json({ message: "Bad request. Invalid user ID" });
    }
    const user = await findUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await redisClient.del(user.toString());
    await findUserAndDelete(req.params.userId);
    return res.status(204).json({ message: "User successfully deleted" });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function deleteMeHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.userId || req.params.userId !== "string") {
      return res
        .status(400)
        .json({ message: "Bad request. Invlaid user's ID" });
    }
    await findUserAndUpdate(req.params.userId, { active: false });
    return res.status(200).json(null);
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}
