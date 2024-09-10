import express from "express";
import { validateSchema } from "../middlewares/validateSchema";
import {
  createFootwearSchema,
  getFootwearSchema,
} from "../schemas/footwearSchema";
import {
  createFootwearHandler,
  getAllFootwearHandler,
  getFootwearHandler,
} from "../controllers/footwearController";
import { tokenProtect } from "../middlewares/tokenProtect";
import { requireUser } from "../middlewares/requireUser";
import { restrictTo } from "../middlewares/restrictTo";
import reviewRouter from "../routes/reviewRoutes";

const router = express.Router({ mergeParams: true });

router.use("/:footwearId/reviews", reviewRouter);

router
  .route("/")
  .post([
    tokenProtect,
    requireUser,
    restrictTo("admin"),
    validateSchema(createFootwearSchema),
    createFootwearHandler,
  ])
  .get(getAllFootwearHandler);

router
  .route("/:footwearId")
  .get(validateSchema(getFootwearSchema), getFootwearHandler);

export default router;
