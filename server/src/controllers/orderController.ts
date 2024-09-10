import { Request, Response, NextFunction } from "express";
import {
  createOrder,
  findOrderById,
  findUserOrders,
} from "../services/orderService";
import { CreateOrderInput } from "../models/orderModel";
import { logger } from "../utils/logger";
import Stripe from "stripe";
import config from "config";
import { DeliverOrderInput, PayOrderInput } from "../schemas/orderSchema";

export async function createOrderHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.body.orderItems.length === 0) {
      return res
        .status(400)
        .json({ message: "Bad request. Shopping cart is ampty" });
    }
    const order = (await createOrder({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      orderItemsPrice: req.body.orderItemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    })) as unknown as CreateOrderInput;
    if (!order) {
      return res
        .status(400)
        .json({ message: "Bad request. Failed to create order" });
    }
    return res.status(201).json({
      status: "success",
      message: "Order successfully created",
      order,
    });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err.stack);
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function getOrderHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.orderId || typeof req.params.orderId !== "string") {
      return res.status(400).json({ message: "Bad request. Invalid order ID" });
    }
    const order = await findOrderById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err.stack);
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function updateToPayOrderHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.orderId || typeof req.params.orderId !== "string") {
      return res.status(400).json({ message: "Bad request. Invalid order ID" });
    }
    const order = await findOrderById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    } else {
      order.isPaid = true;
      order.paidAt = new Date(Date.now());
      order.paymentResult = {
        paymentId: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const paidOrder = await order.save();
      return res.status(200).json({
        status: "success",
        message: "Order paid successfully",
        order: paidOrder,
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err.stack);
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}
export async function getUserOrdersHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const orders = await findUserOrders({ user: req.user._id });
    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }
    return res
      .status(200)
      .json({ result: orders.length, status: "success", data: { orders } });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err.stack);
      return next(err);
    }
    return next(new Error("An unknown error occurrued"));
  }
}

export async function createStripePaymentIntentHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.orderId || typeof req.params.orderId !== "string") {
      return res.status(400).json({ message: "Bad request. Invalid order ID" });
    }
    const order = await findOrderById(req.params.orderId);
    const stripe = new Stripe(config.get<string>("stripeSecretKey"));

    const paymentIntent = await stripe.paymentIntents.create({
      amount: order?.totalPrice! * 100,
      currency: "GBP",
      payment_method_types: ["card"],
    });
    if (!paymentIntent) {
      return res
        .status(400)
        .json({ message: "Failed to create stripe paymen intent" });
    }
    return res
      .status(201)
      .json({ status: "success", clientSecret: paymentIntent.client_secret });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      logger.error(err.stack);
      return res.status(400).json({ message: err.message });
    }
    return next(err);
  }
}

export async function updateToDeliverOrderHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.orderId || typeof req.params.orderId !== "string") {
      return res.status(400).json({ message: "Bad request. Invalid order ID" });
    }
    const order = await findOrderById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    } else {
      order.isDelivered = true;
      order.deliveredAt = new Date(Date.now());

      const deliveredOrder = await order.save();
      return res.status(200).json({
        status: "success",
        message: "Order successfully delivered",
        order: deliveredOrder,
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err.stack);
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}
