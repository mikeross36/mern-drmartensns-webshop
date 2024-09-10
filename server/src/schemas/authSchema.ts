import { object, string, TypeOf } from "zod";

export const registerUserSchema = object({
  body: object({
    userName: string({ required_error: "User name is required" }),
    email: string({ required_error: "Email is required" }).email(
      "Email is not valid"
    ),
    password: string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 chars long")
      .max(24, "Password must not be longer then 24 chars"),
    confirmPassword: string({
      required_error: "Password confirmation is required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
});

export const verifyUserSchema = object({
  params: object({
    userId: string({}),
    verificationString: string({}),
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email(
      "Email is not valid"
    ),
    password: string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 chars long")
      .max(24, "Password must not be longer then 24 chars"),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email(
      "Email is not valid"
    ),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    resetString: string(),
  }),
  body: object({
    password: string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 chars long")
      .max(24, "Password must not be longer then 24 chars"),
    confirmPassword: string({
      required_error: "Password confirmation is required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  }),
});

export const updatePasswordSchema = object({
  body: object({
    currentPassword: string({ required_error: "Current password is required" })
      .min(8, "Password must be at least 8 chars long")
      .max(24, "Password must not be longer then 24 chars"),
    password: string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 chars long")
      .max(24, "Password must not be longer then 24 chars"),
    confirmPassword: string({
      required_error: "Password confirmation is required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>["body"];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
export type UpdatePasswordInput = TypeOf<typeof updatePasswordSchema>["body"];
