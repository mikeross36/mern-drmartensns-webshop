import nextId from "react-id-generator";
import cubeImg1 from "@/assets/images/home-pic.png";
import cubeImg2 from "@/assets/images/footwear/drmartens-7.png";
import cubeImg3 from "@/assets/images/footwear/drmartens-6.png";
import cubeImg4 from "@/assets/images/footwear/drmartens-35.png";
// import truck from "@/assets/images/icons/truck.svg";
// import freeShipping from "@/assets/images/icons/free-shipping.svg";
// import quality from "@/assets/images/icons/quality.svg";
import shop1 from "@/assets/images/dr_martens_shop.jpg";
import shop2 from "@/assets/images/dr_martens_shop2.jpg";
import shop3 from "@/assets/images/dr_martens_shop3.jpg";

export type AboutItemType = {
  id: string;
  photo: string;
};

export const aboutItems = [
  {
    id: nextId(),
    photo: cubeImg1,
  },
  {
    id: nextId(),
    photo: cubeImg2,
  },
  {
    id: nextId(),
    photo: cubeImg3,
  },
  {
    id: nextId(),
    photo: cubeImg4,
  },
];

export type WhyItemsType = {
  id?: string;
  // image: string;
  title: string;
  text: string;
  itemImg: string;
};

export const whyItems = [
  {
    id: nextId(),
    // image: truck,
    title: "Fast Delivery",
    text: "Delivery text",
    itemImg: shop1,
  },
  {
    id: nextId(),
    // image: freeShipping,
    title: "Free Shiping",
    text: "Delivery text",
    itemImg: shop2,
  },
  {
    id: nextId(),
    // image: quality,
    title: "Best Quality",
    text: "Delivery text",
    itemImg: shop3,
  },
];
