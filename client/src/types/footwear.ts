export type FootwearType = {
  _id?: string;
  name: string;
  gender: string;
  category: string;
  coverImage: string;
  price: number;
  material: string;
  soleHeight: string;
  rating?: number | undefined;
  details: string;
  care: string;
};
export type FootwearResponseType = {
  result: number;
  data: {
    footwears?: FootwearType[];
    footwear?: FootwearType;
  };
};
