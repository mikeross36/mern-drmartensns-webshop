import { CartItemType } from "../types/shopping-cart";
import { formatCurrency } from "../utils";

export default function ShippingItem({ item }: { item: CartItemType }) {
  const itemImg = new URL(
    `../assets/images/footwear/${item.image}`,
    import.meta.url
  ).href;
  return (
    <li className="shipping__item">
      <img src={itemImg} alt="shipping item image" />
      <p>{item.name}</p>
      <div className="item__name"></div>
      <span>quantity: {item.quantity}</span>
      <span>price: {formatCurrency(item.price)}</span>
      <span>subtotal: {formatCurrency(item.price * item.quantity)}</span>
    </li>
  );
}
