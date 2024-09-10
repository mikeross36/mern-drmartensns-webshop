import { object, string, TypeOf, array } from "zod";

const payload = {
  body: object({
    name: string({ required_error: "Category name is required" }),
    coverImage: string({ required_error: "Category cover image is required" }),
    description: string({
      required_error: "Category description is required",
    }).max(260, "Description must not be longer then 260 chars"),
    footwears: array(string()),
  }),
};

const params = {
  params: object({
    categoryId: string({ required_error: "Category ID is required" }),
  }),
};

export const createCategorySchema = object({ ...payload });
export const getCategorySchema = object({ ...params });
export const updateCategorySchema = object({ ...params, ...payload });
export const deleteCategorySchema = object({ ...params });

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>["body"];
export type GetCategoryInput = TypeOf<typeof getCategorySchema>["params"];
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>["params"];
