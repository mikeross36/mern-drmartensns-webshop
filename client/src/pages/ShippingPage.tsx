import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ERoutes } from "../types/links";
import { FaBackward } from "react-icons/fa";
import { useAppSelector, useShoppingCartDispatch } from "../hooks";
import { RootState } from "../shopping-cart-state/store";
import { ShoppingCartStateType } from "../shopping-cart-state/reducers";
import { saveShippingAddressAction } from "../shopping-cart-state/action-creators";
import { ShoppingCartActionType } from "../shopping-cart-state/action-types";
import { GiSteeltoeBoots } from "react-icons/gi";
import bcgImage from "@/assets/images/main-bcg-img3.jpg";
import Checkout from "../components/Checkout";
import Button from "../components/Button";

export default function ShippingPage() {
  const { shippingAddress } = useAppSelector(
    (state: RootState) => state.shoppingCart as ShoppingCartStateType
  );
  const [fullName, setFullName] = useState(shippingAddress?.fullName ?? ""); //?? (Nullish Coalescing) only considers null or undefined as triggers for the fallback
  const [address, setAddress] = useState(shippingAddress?.address ?? "");
  const [city, setCity] = useState(shippingAddress?.city ?? "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode ?? ""
  );
  const [country, setCountry] = useState(shippingAddress?.country ?? "");

  const dispatch = useShoppingCartDispatch();
  const navigate = useNavigate();

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      saveShippingAddressAction({
        fullName,
        address,
        city,
        postalCode,
        country,
      }) as unknown as ShoppingCartActionType
    );
    navigate(ERoutes.payment);
  }

  return (
    <section className="shipping__page">
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
      <Checkout step1 step2 />
      <h2 className="section__title">shipping</h2>
      <div className="shipping__title">
        <h3>shipping address</h3>
      </div>
      <form className="shipping__form" onSubmit={handleFormSubmit}>
        <div className="form__field">
          <input
            type="text"
            name="full-name"
            className="form__input"
            autoComplete="off"
            placeholder="full name..."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form__field">
          <input
            type="text"
            name="address"
            className="form__input"
            autoComplete="off"
            placeholder="address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form__field">
          <input
            type="text"
            name="address"
            className="form__input"
            autoComplete="off"
            placeholder="city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form__field">
          <input
            type="text"
            name="address"
            className="form__input"
            autoComplete="off"
            placeholder="postal code..."
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div className="form__field">
          <input
            type="text"
            name="address"
            className="form__input"
            autoComplete="off"
            placeholder="country..."
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <Button type="submit" className="button button-light" text="continue" />
      </form>
    </section>
  );
}
