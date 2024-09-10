import { useState, useEffect } from "react";
import { FaBackward } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ERoutes } from "../types/links";
import { GiSteeltoeBoots } from "react-icons/gi";
import { useAppSelector, useShoppingCartDispatch } from "../hooks";
import { RootState } from "../shopping-cart-state/store";
import { ShoppingCartActionType } from "../shopping-cart-state/action-types";
import { savePaymentMethodAction } from "../shopping-cart-state/action-creators";
import { ShoppingCartStateType } from "../shopping-cart-state/reducers";
import bcgImage from "@/assets/images/main-bcg-img4.jpg";
import Checkout from "../components/Checkout";
import Button from "../components/Button";

export default function PaymentPage() {
  const { shippingAddress, paymentMethod } = useAppSelector(
    (state: RootState) => state.shoppingCart as ShoppingCartStateType
  );
  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "PayPal"
  );

  const navigate = useNavigate();
  const dispatch = useShoppingCartDispatch();

  useEffect(() => {
    if (!shippingAddress.address) navigate(ERoutes.shipping);
  }, [shippingAddress, navigate]);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      savePaymentMethodAction(
        paymentMethodName
      ) as unknown as ShoppingCartActionType
    );
    navigate(ERoutes.createorder);
  }

  return (
    <section className="payment__page section">
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
      <Checkout step1 step2 step3 />
      <h2 className="section__title">payment</h2>
      <div className="payment__title">
        <h3>payment method</h3>
      </div>
      <form className="payment__form" onSubmit={handleFormSubmit}>
        <div className="form__field">
          <input
            type="radio"
            name="PayPal"
            id="paypal"
            value={paymentMethod || "PayPal"}
            onChange={(e) => setPaymentMethodName(e.target.value)}
          />
          <label htmlFor="PayPal">PayPal</label>
        </div>
        <div className="form__field">
          <input
            type="radio"
            name="Stripe"
            id="stripe"
            value={paymentMethod || "Stripe"}
            onChange={(e) => setPaymentMethodName(e.target.value)}
          />
          <label htmlFor="stripe">Stripe</label>
        </div>
        <Button type="submit" className="button button-light" text="continue" />
      </form>
    </section>
  );
}
