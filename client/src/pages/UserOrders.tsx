import { Link } from "react-router-dom";
import { ERoutes } from "../types/links";
import { FaBackward } from "react-icons/fa";
import { GiSteeltoeBoots } from "react-icons/gi";
import { useGetUserOrders } from "../features/orders";
import bcgImage from "@/assets/images/main-bcg-img4.jpg";
import Spinner from "../components/Spinner";
import OrderItem from "../components/OrderItem";

export default function UserOrders() {
  const { data: orders, isPending } = useGetUserOrders();

  return (
    <section className="user__orders section">
      <Link to={ERoutes.home}>
        <FaBackward size={40} fill="#ffa500" />
      </Link>
      <div className="page__background-img">
        <img src={bcgImage} alt="auth page background image" />
      </div>
      <div className="logo__icon">
        <GiSteeltoeBoots size={60} className="logo__icon-boot" />
        <span className="logo__icon-text">home</span>
      </div>
      {orders?.length === 0 ? (
        <h2 className="section__title">no orders</h2>
      ) : (
        <>
          <h2 className="section__title">your orders</h2>
          {isPending ? (
            <Spinner />
          ) : (
            <ul className="user__orders-list">
              {orders?.map((order) => {
                return <OrderItem key={order._id} order={order} />;
              })}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
