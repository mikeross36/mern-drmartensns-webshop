import express from "express";
import { tokenProtect } from "../middlewares/tokenProtect";
import { requireUser } from "../middlewares/requireUser";
import {
  getAllUsersHandler,
  getUserInfo,
  getUserHandler,
  updateUserAccountHandler,
} from "../controllers/userController";
import {
  resizeUserPhoto,
  uploadUserPhoto,
} from "../controllers/uploadController";
import { restrictTo } from "../middlewares/restrictTo";
import { validateSchema } from "../middlewares/validateSchema";
import { getUserSchema, updateUserAccountSchema } from "../schemas/userSchema";

const router = express.Router();

router.use(tokenProtect, requireUser);

router.get("/loggedin-info", getUserInfo);
router.get(
  "/user:userId",
  restrictTo("admin", "user"),
  validateSchema(getUserSchema),
  getUserHandler
);
router.get("/", restrictTo("admin"), getAllUsersHandler);
router.patch(
  "/update-user-account",
  uploadUserPhoto,
  resizeUserPhoto,
  // validateSchema(updateUserAccountSchema),
  updateUserAccountHandler
);

export default router;
