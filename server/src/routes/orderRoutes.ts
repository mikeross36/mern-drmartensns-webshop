import express from "express";
import { tokenProtect } from "../middlewares/tokenProtect";
import { requireUser } from "../middlewares/requireUser";
import { validateSchema } from "../middlewares/validateSchema";
import {
  createOrderSchema,
  deliverOrderSchema,
  getOrderSchema,
  getUserOrdersSchema,
  payOrderSchema,
} from "../schemas/orderSchema";
import {
  createOrderHandler,
  getOrderHandler,
  getUserOrdersHandler,
  updateToPayOrderHandler,
  createStripePaymentIntentHandler,
  updateToDeliverOrderHandler,
} from "../controllers/orderController";

const router = express.Router();

router.use(tokenProtect, requireUser);

router.post("/", createOrderHandler);
// if place router /:id above route user/orders (/api/v1/orders/user-orders) router will
// consider /user-orders as an id, and it is not type of ObjectId;
router.put(
  "/:orderId/pay-order",
  // validateSchema(payOrderSchema),
  updateToPayOrderHandler
);
router.get(
  "/user-orders",
  validateSchema(getUserOrdersSchema),
  getUserOrdersHandler
);
router.get("/:orderId", validateSchema(getOrderSchema), getOrderHandler);
router.post(
  "/:orderId/stripe-payment-intent",
  createStripePaymentIntentHandler
);
router.put(
  "/:orderId/deliver-order",
  // validateSchema(deliverOrderSchema),
  updateToDeliverOrderHandler
);

export default router;
