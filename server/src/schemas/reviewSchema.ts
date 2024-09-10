import { object, string, custom, TypeOf } from "zod";
import { User } from "../models/userModel";
import { Footwear } from "../models/footwearModel";

export const createReviewSchema = object({
  body: object({
    content: string({ required_error: "Review content is required" }).max(
      260,
      "Review content cannot be longer then 260 chars"
    ),
    user: custom<User["_id"]>(),
    footwear: custom<Footwear["_id"]>(),
  }),
});

export const updateReviewSchema = object({
  params: object({
    reviewId: string(),
  }),
  body: object({
    content: string({ required_error: "Review content is required" }).max(
      260,
      "Review content cannot be longer then 260 chars"
    ),
  }),
});

export const findReviewSchema = object({
  params: object({
    reviewId: string(),
  }),
});

export const deleteReviewSchema = object({
  params: object({
    reviewId: string(),
  }),
});

export type CreateReviewInput = TypeOf<typeof createReviewSchema>;
export type UpdateReviewInput = TypeOf<typeof updateReviewSchema>;
export type FindReviewInput = TypeOf<typeof findReviewSchema>["params"];
export type DeleteReviewInput = TypeOf<typeof deleteReviewSchema>["params"];
