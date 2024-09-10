import { object, string, number, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({ required_error: "Name is required" }),
    gender: string({ required_error: "Gender is required" }),
    category: string({ required_error: "Category is required" }),
    coverImage: string({ required_error: "Cover image is required" }),
    price: number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    }).positive({ message: "Price must be grater then zero" }),
    material: string({ required_error: "Material is required" }),
    soleHeight: string({ required_error: "Sole height is required" }),
    details: string({ required_error: "Details are required" }),
    care: string({ required_error: "Care is required" }),
  }),
};

const params = {
  params: object({
    footwearId: string({ required_error: "Footwear's ID is required" }),
  }),
};

export const createFootwearSchema = object({ ...payload });
export const getFootwearSchema = object({ ...params });
export const updateFootwearSchema = object({ ...params, ...payload });
export const deleteFootwearSchema = object({ ...params });

export type CreateFootwearInput = TypeOf<typeof createFootwearSchema>["body"];
export type GetFootwearInput = TypeOf<typeof getFootwearSchema>["params"];
export type UpdateFootwearInput = TypeOf<typeof updateFootwearSchema>;
export type DeleteFootwearInput = TypeOf<typeof deleteFootwearSchema>["params"];
