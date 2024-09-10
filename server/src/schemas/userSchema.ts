import { object, string, any, TypeOf } from "zod";

export const getUserSchema = object({
  params: object({
    userId: string({ required_error: "User ID is required" }),
  }),
});

export const updateUserAccountSchema = object({
  body: object({
    userName: string({ required_error: "User name is required" }),
    email: string({ required_error: "Email is required" }),
    photo: string({ required_error: "Photo is required" }),
  }),
});

export const updateMeSchema = object({
  body: object({
    userName: string({ required_error: "User name is required" }),
    email: string({ required_error: "Email is required" }).email(
      "Email is not valid"
    ),
    formData: any(),
  }),
});

export type GetUserInput = TypeOf<typeof getUserSchema>["params"];
export type UpdateUserAccountInput = TypeOf<
  typeof updateUserAccountSchema
>["body"];
export type UpdateMeInput = TypeOf<typeof updateMeSchema>["body"];
