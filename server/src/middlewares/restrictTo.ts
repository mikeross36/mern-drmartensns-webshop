import { Request, Response, NextFunction } from "express";

export const restrictTo = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    if (!allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: "You are not allowed to perform this action!" });
    }
    next();
  };
};
