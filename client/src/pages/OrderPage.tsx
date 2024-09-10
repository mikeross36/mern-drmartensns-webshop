import { useEffect } from "react";
import {
  useGetOrder,
  useGetPaypalClient,
  usePayOrder,
  useDeliverOrder,
} from "../features/orders";
import bcgImage from "@/assets/images/main-bcg-img.jpg";
import { FaBackward } from "react-icons/fa";
import { GiSteeltoeBoots } from "react-icons/gi";
import { Link, useParams } from "react-router-dom";
import { CartItemType } from "../types/shopping-cart";
import { formatCurrency } from "../utils";
import { useAuthContext } from "../hooks";
import {
  usePayPalScriptReducer,
  PayPalButtons,
  ReactPayPalScriptOptions,
  SCRIPT_LOADING_STATE,
  PayPalButtonsComponentProps,
  DISPATCH_ACTION,
} from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { ERoutes } from "../types/links";
import ShippingItem from "../components/ShippingItem";
import Spinner from "../components/Spinner";
import Button from "../components/Button";

export default function OrderPage() {
  const { id: orderId } = useParams();
  const { data: order, isLoading, refetch } = useGetOrder(orderId!);
  const { mutateAsync: payOrderAction } = usePayOrder();
  const { mutateAsync: deliverOrderAction } = useDeliverOrder();

  const authContext = useAuthContext();
  const userInfo = authContext?.state.authUser;
  // const navigate = useNavigate();

  //   PayPal
  const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypalClient } = useGetPaypalClient();

  useEffect(() => {
    if (paypalClient && paypalClient.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: DISPATCH_ACTION.RESET_OPTIONS,
          value: {
            "client-id": paypalClient!.clientId,
            currency: "GBP",
          } as unknown as ReactPayPalScriptOptions,
        });
        paypalDispatch({
          type: DISPATCH_ACTION.LOADING_STATUS,
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };
      loadPayPalScript();
    }
  }, [paypalClient, paypalDispatch]);

  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: "vertical" },
    async createOrder(_data, actions) {
      const orderID = await actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: "GBP",
              value: order!.totalPrice.toString(),
            },
          },
        ],
        intent: "CAPTURE",
      });
      return orderID;
    },
    async onApprove(_data, actions) {
      const details = await actions.order!.capture();
      try {
        await payOrderAction({ orderId: orderId!, ...details });
        refetch();
        toast.warning("Order successfully paid by PayPal");
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    },
    onError(err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    },
  };

  async function handleTestPayment() {
    try {
      await payOrderAction({ orderId: orderId! });
      refetch();
      toast.success("Test payment successfull");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
      toast.error("An unknown error occurred");
    }
  }

  async function handleDeliverOrder() {
    try {
      await deliverOrderAction(orderId!);
      refetch();
      // navigate(`${ERoutes.home}`);
      // const timer = setTimeout(() => {
      //   navigate(`${ERoutes.home}`);
      // }, 1000);
      // return () => {
      //   clearTimeout(timer);
      // };
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
      toast.error("An unknown error occurred");
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="order__page section">
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
      <h2 className="section__title">order</h2>
      <div className="order__page-wrapper">
        <div className="shipping__data">
          <div className="shipping__data-card">
            <h4 className="card__title">shipping</h4>
            <article className="card__data">
              <p>name: {order!.shippingAddress.fullName}</p>
              <p>address: {order!.shippingAddress.address}</p>
              <p>postal code: {order!.shippingAddress.postalCode}</p>
              <p>city: {order!.shippingAddress.city}</p>
              <p>country: {order!.shippingAddress.country}</p>
            </article>
            {order!.isDelivered ? (
              <span>delivered at: {order!.deliveredAt}</span>
            ) : (
              <span>Not delivered</span>
            )}
          </div>
          <div className="shipping__data-card">
            <h4 className="card__title">items</h4>
            <ul className="shipping__items">
              {order?.orderItems.map((item: CartItemType) => {
                return <ShippingItem key={item._id} item={item} />;
              })}
            </ul>
          </div>
        </div>
        <div className="summary__data">
          <div className="summary__data-card">
            <h4 className="card__title">order summary</h4>
            <ul className="summary__items">
              <li className="summary__item">
                <p>items</p>
                <span>{formatCurrency(order!.orderItemsPrice)}</span>
              </li>
              <li className="summary__item">
                <p>shipping</p>
                <span>{formatCurrency(order!.shippingPrice)}</span>
              </li>
              <li className="summary__item">
                <p>tax</p>
                <span>{formatCurrency(order!.taxPrice)}</span>
              </li>
              <li className="summary__item">
                <p>total</p>
                <span>{formatCurrency(order!.totalPrice)}</span>
              </li>
              {!order?.isPaid && (
                <li className="summary__Item">
                  {isPending ? (
                    <Spinner />
                  ) : isRejected ? (
                    toast.error("Error connecting PayPal")
                  ) : (
                    <div>
                      <PayPalButtons {...paypalbuttonTransactionProps} />
                      <Button
                        onClick={handleTestPayment}
                        type="button"
                        className="button-details"
                        text="Pay"
                      />
                    </div>
                  )}
                </li>
              )}
              {userInfo && order?.isPaid && !order.isDelivered && (
                <li className="summary__item">
                  <div>
                    <Button
                      onClick={handleDeliverOrder}
                      type="button"
                      className="button-details"
                      text="deliver"
                    />
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
