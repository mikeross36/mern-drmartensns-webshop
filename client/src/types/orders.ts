import { CartItemType, ShippingAddressType } from "./shopping-cart";
import { UserType } from "./users";

export type OrderType = {
  _id: string;
  orderItems: CartItemType[];
  shippingAddress: ShippingAddressType;
  paymentMethod: string;
  user: UserType;
  createdAt: string;
  paidAt: string;
  isPaid: boolean;
  isDelivered: boolean;
  deliveredAt: string;
  orderItemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};

export type OrderResponseType = {
  result: number;
  data: {
    orders: OrderType[];
  };
};

export interface IOrderResponse {
  status: string;
  data: {
    order: OrderType;
  };
}
