import express from "express";
import { validateSchema } from "../middlewares/validateSchema";
import {
  loginUserSchema,
  registerUserSchema,
  verifyUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updatePasswordSchema,
} from "../schemas/authSchema";
import {
  loginUserHandler,
  registerUserHandler,
  verifyUserHandler,
  refreshAccessTokenHandler,
  logoutUserHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  updatePasswordHandler,
} from "../controllers/authController";
import { tokenProtect } from "../middlewares/tokenProtect";
import { requireUser } from "../middlewares/requireUser";

const router = express.Router();

router.post(
  "/register",
  validateSchema(registerUserSchema),
  registerUserHandler
);
router.post(
  "/verify/:userId/:verificationString",
  validateSchema(verifyUserSchema),
  verifyUserHandler
);
router.post("/login", validateSchema(loginUserSchema), loginUserHandler);
router.get("/refresh-token", refreshAccessTokenHandler);
router.post(
  "/forgot-password",
  validateSchema(forgotPasswordSchema),
  forgotPasswordHandler
);
router.patch(
  "/reset-password/:resetString",
  validateSchema(resetPasswordSchema),
  resetPasswordHandler
);

router.use(tokenProtect, requireUser);

router.post("/logout", logoutUserHandler);
router.patch(
  "/update-password",
  validateSchema(updatePasswordSchema),
  updatePasswordHandler
);

export default router;
