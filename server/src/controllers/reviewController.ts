import { Request, Response, NextFunction } from "express";
import {
  createReview,
  findAndUpdateReview,
  findAndDeleteReview,
  findAllReviews,
  findReviewById,
} from "../services/reviewService";

export function setFootwearAndUserIds(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.footwear) req.body.footwear = req.params.footwearId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
}

export async function createReviewHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const review = await createReview(req.body);
    if (!review) {
      return res
        .status(400)
        .json({ message: "Failed to create review. Invalid data passed" });
    }
    return res
      .status(201)
      .json({ status: "success", message: "Review added", data: { review } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function getAllReviewsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviews = await findAllReviews();
    if (!reviews) {
      return res.status(404).json({ message: "Reviews not found!" });
    }
    return res.status(200).json({ result: reviews.length, data: { reviews } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function getReviewHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.reviewId || typeof req.params.reviewId !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Bad request. Invalid review id" });
    }
    const review = await findReviewById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: "Reviewe not found" });
    }
    return res.status(200).json({ status: "success", data: { review } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function updateReviewHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.reviewId || typeof req.params.reviewId !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid review id" });
    }
    const updatedReview = await findAndUpdateReview(
      req.params.reviewId,
      req.body
    );
    if (!updatedReview) {
      return res.status(400).json({ message: "Failed to update review" });
    }
    return res.status(201).json({ status: "success", updatedReview });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function deleteReviewHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.reviewId || typeof req.params.reviewId !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "review order id" });
    }
    const reviewToDel = await findAndDeleteReview(req.params.reviewId);
    if (!reviewToDel) {
      return res.status(400).json({ message: "Failed to delete review" });
    }
    return res
      .status(204)
      .json({ status: "success", message: "Review deleted", data: null });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}
