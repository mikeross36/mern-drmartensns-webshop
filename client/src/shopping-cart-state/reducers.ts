import { CartItemType, ShippingAddressType } from "../types/shopping-cart";
import { PayloadAction } from "@reduxjs/toolkit";
import { ShoppingCartActionTypes } from "./action-types";

const initialState = {
  cartItems: [],
  cartTotal: 0,
  itemsTotal: 0,
  shippingAddress: {},
  paymentMethod: "",
  orderItemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

export type ShoppingCartStateType = {
  cartItems: CartItemType[];
  cartTotal: number;
  itemsTotal: number;
  shippingAddress: ShippingAddressType;
  paymentMethod: string;
  orderItemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};

export function shoppingCartReducer(
  state = initialState as unknown as ShoppingCartStateType,
  // Instead of ActionCartActionType we use PayloadAction, action with a string type
  // and an associated payload. This is the type of action returned by action creators.
  action: PayloadAction<CartItemType>
) {
  switch (action.type) {
    case ShoppingCartActionTypes.ADD_ITEM_TO_CART: {
      if (!action.payload || !action.payload._id) {
        return state;
      }
      let cartItemsCopy: CartItemType[] = [...state.cartItems];
      const currItemIdx = cartItemsCopy.findIndex(
        (item) => item._id === action.payload._id
      );
      if (currItemIdx < 0) {
        cartItemsCopy = [...cartItemsCopy, action.payload];
      } else {
        const currItemCopy = cartItemsCopy[currItemIdx];
        cartItemsCopy[currItemIdx] = {
          ...currItemCopy,
          quantity: currItemCopy.quantity + 1,
        };
      }
      return { ...state, cartItems: cartItemsCopy };
    }
    case ShoppingCartActionTypes.REMOVE_ITEM_FROM_CART: {
      if (!action.payload || !action.payload._id) {
        return state;
      }
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    }
    case ShoppingCartActionTypes.INCREASE_QUANTITY: {
      if (!action.payload || !action.payload._id) {
        return state;
      }
      const updatedCartItems: CartItemType[] = state.cartItems.map((item) =>
        item._id === action.payload._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, cartItems: updatedCartItems };
    }

    case ShoppingCartActionTypes.DECREASE_QUANTITY: {
      if (!action.payload || !action.payload._id) {
        return state;
      }
      const MIN_QUANT = 0;
      const updatedCartItems: CartItemType[] = state.cartItems
        .map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > MIN_QUANT);

      return { ...state, cartItems: updatedCartItems };
    }
    case ShoppingCartActionTypes.GET_TOTALS: {
      let {
        cartTotal,
        itemsTotal,
        orderItemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      } = state.cartItems.reduce(
        (acc, currItem) => {
          const currItemTotal = currItem.price * currItem.quantity;
          acc.cartTotal += currItemTotal;
          acc.itemsTotal += currItem.quantity;
          return acc;
        },
        {
          cartTotal: 0,
          itemsTotal: 0,
          orderItemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        }
      );
      if (isNaN(cartTotal) || isNaN(itemsTotal)) {
        console.error("Invalid calculation result");
        return state;
      }
      cartTotal = Number(cartTotal);
      itemsTotal = Number(itemsTotal);
      orderItemsPrice = cartTotal;
      shippingPrice = cartTotal * 0.1;
      taxPrice = shippingPrice * 0.1;
      totalPrice = cartTotal + shippingPrice + taxPrice;

      return {
        ...state,
        cartTotal,
        itemsTotal,
        orderItemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      };
    }
    case ShoppingCartActionTypes.CLEAR_SHOPPING_CART: {
      const EMPTY_CART: CartItemType[] = [];
      let cartItemsCopy: CartItemType[] = [...state.cartItems];
      cartItemsCopy = EMPTY_CART;
      return { ...state, cartItems: cartItemsCopy };
    }
    case ShoppingCartActionTypes.SAVE_SHIPPING_ADDRESS: {
      return { ...state, shippingAddress: action.payload };
    }
    case ShoppingCartActionTypes.CLEAR_SHIPPING_ADDRESS: {
      return { ...state, shippingAddres: {} };
    }
    case ShoppingCartActionTypes.SAVE_PAYMENT_METHOD: {
      return { ...state, paymentMethod: action.payload };
    }
    default:
      return state;
  }
}
