import { getModelForClass } from "@typegoose/typegoose";
import { User } from "./userModel";
import { Footwear } from "./footwearModel";
import { Category } from "./categoryModel";
import { Review } from "./reviewModel";
import { Order } from "./orderModel";

export const UserModel = getModelForClass(User);
export const FootwearModel = getModelForClass(Footwear);
export const CategoryModel = getModelForClass(Category);
export const ReviewModel = getModelForClass(Review);
export const OrderModel = getModelForClass(Order);
