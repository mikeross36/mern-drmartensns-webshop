import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";
import sharp from "sharp";
import { logger } from "../utils/logger";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/users");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
  },
});

// const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!file.mimetype.startsWith("image")) {
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadUserPhoto = upload.single("photo");

export async function resizeUserPhoto(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.file) return next();
    req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(800, 450)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/images/users/${req.file.filename}`);

    next();
  } catch (err: any) {
    next(err);
  }
}

export async function uploadUserPhotoHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info(req.file);
}
