import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { CartItemType, ShippingAddressType } from "../types/shopping-cart";
import {
  createOrder,
  getOrder,
  getPaypalClient,
  payOrder,
  deliverOrder,
  getUserOrders,
} from "../api/orders";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { OrderResponseType } from "../types/orders";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order: {
      orderItems: CartItemType[];
      shippingAddress: ShippingAddressType;
      paymentMethod: string;
      orderItemsPrice: number;
      shippingPrice: number;
      taxPrice: number;
      totalPrice: number;
    }) => createOrder(order),
    onMutate: () => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      queryClient.cancelQueries({ queryKey: ["orders"] });
    },
    onError: (err, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(["orders"], context);
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the correct data
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useGetOrder(id: string) {
  return useQuery({
    queryKey: ["orders", { id }],
    queryFn: () => getOrder(id),
  });
}

export function useGetPaypalClient() {
  return useQuery({
    queryKey: ["paypal-clientId"],
    queryFn: () => getPaypalClient(),
  });
}

export function usePayOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payment: { orderId: string }) => payOrder(payment),
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useDeliverOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) => deliverOrder(orderId),
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useGetUserOrders() {
  const memoizedSelect = useCallback(
    (data: OrderResponseType) => data.data.orders,
    []
  );
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getUserOrders(),
    select: memoizedSelect,
  });
}
