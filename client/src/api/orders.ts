import { apiClient } from "./apiClient";
import { OrderResponseType, OrderType } from "../types/orders";
import { CartItemType, ShippingAddressType } from "../types/shopping-cart";

export async function createOrder(order: {
  orderItems: CartItemType[];
  shippingAddress: ShippingAddressType;
  paymentMethod: string;
  orderItemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}) {
  return (
    await apiClient.post<{ message: string; order: OrderType }>(
      "/orders",
      order
    )
  ).data;
}

export async function getOrder(id: string) {
  return (await apiClient.get<OrderType>(`/orders/${id}`)).data;
}

export async function payOrder(payment: { orderId: string }) {
  return (
    await apiClient.put<{ status: string; message: string; order: OrderType }>(
      `/orders/${payment.orderId}/pay-order`,
      {
        payment,
      }
    )
  ).data;
}

export async function getPaypalClient() {
  return (await apiClient.get<{ clientId: string }>("/keys/paypal")).data;
}

export async function getStripePublishableKey() {
  return (await apiClient.get<{ key: string }>("/keys/stripe")).data;
}

export async function createStripePaymentIntent(id: string) {
  return (await apiClient.post(`/orders/${id}/stripe-payment-intent`)).data;
}

export async function deliverOrder(orderId: string) {
  return (
    await apiClient.put<{ status: string; message: string; order: OrderType }>(
      `/orders/${orderId}/deliver-order`
    )
  ).data;
}

export async function getUserOrders() {
  return (await apiClient.get<OrderResponseType>("/orders/user-orders")).data;
}
