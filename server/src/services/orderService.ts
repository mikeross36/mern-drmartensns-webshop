import { GetUserOrdersInput } from "../schemas/orderSchema";
import { CreateOrderInput } from "../models/orderModel";
import { OrderModel } from "../models";
import { logger } from "../utils/logger";

export function createOrder(input: CreateOrderInput) {
  try {
    return OrderModel.create(input);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error creating order: ${err.message}`);
      throw new Error("Failed to create order");
    }
    throw err;
  }
}

export function findOrderById(id: string) {
  try {
    return OrderModel.findById(id);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding order by id: ${err.message}`);
      throw new Error("Failed to find order by id");
    }
    throw err;
  }
}

export function findUserOrders(input: GetUserOrdersInput) {
  try {
    return OrderModel.find(input);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding user orders: ${err.message}`);
      throw new Error("Failed to find user orders");
    }
    throw err;
  }
}
