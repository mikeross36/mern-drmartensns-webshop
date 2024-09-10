import { FootwearType } from "./footwear";

export type CategoryType = {
  _id?: string;
  name: string;
  coverImage: string;
  description: string;
  footwears: FootwearType[];
};

export type CategoryResponseType = {
  result: number;
  data: {
    categories: CategoryType[];
  };
};
