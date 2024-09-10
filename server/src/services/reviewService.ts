import { CreateReviewInput } from "../schemas/reviewSchema";
import { ReviewModel } from "../models";
import { logger } from "../utils/logger";

export function createReview(input: CreateReviewInput) {
  try {
    return ReviewModel.create(input);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error creating review: ${err.message}`);
      throw new Error("Failed to create review");
    }
    throw err;
  }
}

export function findAllReviews() {
  try {
    return ReviewModel.find();
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error getting all reviews: ${err.message}`);
    }
    throw err;
  }
}

export function findReviewById(id: string) {
  try {
    return ReviewModel.findById(id);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding review by id: ${err.message}`);
    }
    throw err;
  }
}

export function findAndUpdateReview(id: string, input: CreateReviewInput) {
  try {
    return ReviewModel.findByIdAndUpdate(id, input);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding and updating review: ${err.message}`);
      throw new Error("Failed to find and update review");
    }
    throw err;
  }
}

export function findAndDeleteReview(id: string) {
  try {
    return ReviewModel.findByIdAndDelete(id);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding and deleting review: ${err.message}`);
      throw new Error("Failed to find and delete review");
    }
    throw err;
  }
}
