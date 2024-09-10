import { Request, Response, NextFunction } from "express";
import {
  createFootwear,
  findAllFootwear,
  findFootwearById,
} from "../services/footwearService";

export async function createFootwearHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const footwear = await createFootwear(req.body);
    if (!footwear) {
      return res
        .status(400)
        .json({ message: "Bad request. Failed to create footwear" });
    }
    return res.status(201).json({ status: "success", data: { footwear } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function getAllFootwearHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const footwears = await findAllFootwear();
    if (!footwears) {
      return res.status(400).json({ message: "Unable to find all footwear" });
    }
    return res
      .status(200)
      .json({ result: footwears.length, data: { footwears } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error accured"));
  }
}

export async function getFootwearHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.footwearId || typeof req.params.footwearId !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid footwear id" });
    }
    const footwear = await findFootwearById(req.params.footwearId);
    if (!footwear) {
      return res.status(400).json({ message: "Unable to get footwear" });
    }
    return res.status(200).json({ data: { footwear } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}
