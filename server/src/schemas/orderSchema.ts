import {
  OrderItem,
  ShippingAddress,
  PaymentResult,
} from "../models/orderModel";
import { User } from "../models/userModel";
import { object, array, custom, string, number, TypeOf, boolean } from "zod";

export const createOrderSchema = object({
  body: object({
    orderItems: array(custom<OrderItem>()).nonempty(),
    shippingAddress: custom<ShippingAddress>(),
    paymentMethod: string(),
    orderItemsPrice: number({
      invalid_type_error: "It must be a number",
    }).positive(),
    shippingPrice: number({
      invalid_type_error: "It must be a number",
    }).positive(),
    taxPrice: number({ invalid_type_error: "It must be a number" }).positive(),
    totalPrice: number({
      invalid_type_error: "It must be a number",
    }).positive(),
    user: custom<User["_id"]>(),
  }),
});

export const getOrderSchema = object({
  params: object({
    orderId: string({ required_error: "Order ID is required" }),
  }),
});

export const payOrderSchema = object({
  params: object({
    orderId: string({ required_error: "Order ID is required" }),
  }),
  body: object({
    isPaid: boolean({ required_error: "Is paid confirmation is required" }),
    paidAt: string().date(),
    paymentResult: custom<PaymentResult>(),
  }),
});

export const getUserOrdersSchema = object({
  body: object({
    user: custom<User["_id"]>(),
  }),
});

export const deliverOrderSchema = object({
  params: object({
    orderId: string({ required_error: "Order ID is reqired" }),
  }),
  body: object({
    isDelivered: boolean({
      required_error: "Is deliverd confirmation is required",
    }),
    deliveredAt: string().date(),
  }),
});

export type CreateOrderInput = TypeOf<typeof createOrderSchema>["body"];
export type GetOrderInput = TypeOf<typeof getOrderSchema>["params"];
export type PayOrderInput = TypeOf<typeof payOrderSchema>;
export type GetUserOrdersInput = TypeOf<typeof getUserOrdersSchema>["body"];
export type DeliverOrderInput = TypeOf<typeof deliverOrderSchema>;
