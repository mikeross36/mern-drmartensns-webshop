import { CartItemType } from "../../types/shopping-cart";
import { formatCurrency } from "../../utils";
import { useShoppingCartDispatch } from "../../hooks";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import {
  decreaseQuantityAction,
  increaseQuantityAction,
  removeItemFromCartAction,
} from "../../shopping-cart-state/action-creators";
import { ShoppingCartActionType } from "../../shopping-cart-state/action-types";

export default function CartItem({ item }: { item: CartItemType }) {
  const itemImage = new URL(
    `../../assets/images/footwear/${item.image}`,
    import.meta.url
  ).href;
  const dispatch = useShoppingCartDispatch();
  const subtotal = item.price * item.quantity;

  return (
    <li className="cart__item">
      <img src={itemImage} alt="cart item image" />
      <em className="cart__item-category">{item.category} category</em>
      <p className="cart__item-name">{item.name}</p>
      <h4>{formatCurrency(item.price)}</h4>
      <div className="cart__item-quantity-btns">
        <button
          onClick={() =>
            dispatch(
              decreaseQuantityAction(item) as unknown as ShoppingCartActionType
            )
          }
          className="quantity__button"
        >
          <FaMinusCircle size={20} />
        </button>
        <span className="cart__item-quantity">{item.quantity}</span>
        <button
          onClick={() =>
            dispatch(
              increaseQuantityAction(item) as unknown as ShoppingCartActionType
            )
          }
          className="quantity__button"
        >
          <FaPlusCircle size={20} />
        </button>
        <button
          onClick={() =>
            dispatch(
              removeItemFromCartAction(
                item
              ) as unknown as ShoppingCartActionType
            )
          }
          className="cart__item-remove"
        >
          ❌
        </button>
      </div>
      <p>
        Total: <strong>{formatCurrency(subtotal)}</strong>
      </p>
    </li>
  );
}
