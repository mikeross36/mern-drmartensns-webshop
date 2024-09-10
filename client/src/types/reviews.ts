import { UserType } from "./users";
import { FootwearType } from "./footwear";

export type ReviewType = {
  _id: string;
  content: string;
  rating: number;
  user: UserType;
  footwear: FootwearType;
};

export interface IReviewResponse {
  result: number;
  data: {
    reviews?: ReviewType[];
    review?: ReviewType;
  };
}
