import { OrderType } from "../types/orders";
import { formatDate } from "date-fns";
import { formatCurrency } from "../utils";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "../types/links";
import Button from "./Button";

export default function OrderItem({ order }: { order: OrderType }) {
  const navigate = useNavigate();

  return (
    <li className="order__item">
      <p>order ID: {order._id}</p>
      <p>created: {formatDate(order?.createdAt, "dd.MM.yyyy")}</p>
      <p>total price: {formatCurrency(order.totalPrice)}</p>
      <p>
        order paid:{" "}
        {order.isPaid && order.paidAt
          ? formatDate(order?.paidAt, "dd.MM.yyyy")
          : "NO"}
      </p>
      <p>
        order delivered:{" "}
        {order.isDelivered ? formatDate(order.deliveredAt, "dd.MM.yyyy") : "NO"}
      </p>
      <Button
        onClick={() => navigate(`${ERoutes.order}/${order._id}`)}
        type="button"
        className="button-details"
        text="details"
      />
    </li>
  );
}
