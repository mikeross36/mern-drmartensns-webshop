import { useState } from "react";
import { FootwearType } from "../types/footwear";
import { formatCurrency } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { ERoutes } from "../types/links";
import {
  useShoppingCartDispatch,
  useAppContext,
  useAppSelector,
} from "../hooks";
import { addItemToCartAction } from "../shopping-cart-state/action-creators";
import { ShoppingCartActionType } from "../shopping-cart-state/action-types";
import Button from "./Button";
import RatingStars from "./stars/RatingStars";
import { RootState } from "../shopping-cart-state/store";
import { ShoppingCartStateType } from "../shopping-cart-state/reducers";
import LazyLoad from "react-lazy-load";

export default function ShopItem({ item }: { item: FootwearType }) {
  const [itemRating, setItemRating] = useState(item.rating);
  const [quantity] = useState<number>(1);
  const { setIsCartOpen } = useAppContext();
  const { cartItems } = useAppSelector(
    (state: RootState) => state.shoppingCart as ShoppingCartStateType
  );
  const itemImage = new URL(
    `../assets/images/footwear/${item.coverImage}`,
    import.meta.url
  ).href;

  const inCart: boolean = cartItems.some(
    (cartItem) => cartItem._id === item._id
  );
  const itemInCart = inCart ? "Item in cart ✔️" : null;

  const dispatch = useShoppingCartDispatch();
  const navigate = useNavigate();

  function handleAddItemToCart() {
    if (!item._id) {
      return;
    }
    dispatch(
      addItemToCartAction(
        item as FootwearType & { _id: string },
        quantity
      ) as unknown as ShoppingCartActionType
    );
    navigate(ERoutes.home);
    const timer = setTimeout(() => {
      setIsCartOpen(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }

  return (
    <li className="shop__item">
      <div className="image__wrapper">
        <LazyLoad height={"100%"}>
          <img
            src={itemImage}
            alt="shop item cover image"
            className="shop__item-img"
          />
        </LazyLoad>
        <h3 className="image__wrapper-title">martensns</h3>
      </div>
      <div className="shop__item-wrapper">
        <p className="shop__item-name">{item.name}</p>
        <h4 className="shop__item-price">
          {item.price ? formatCurrency(item.price) : "N/A"}
        </h4>
        <p className="shop__item-name">{item.material}</p>
        <Link to={`${ERoutes.footwear}/${item._id}`}>
          <Button type="button" className="button-details" text="details" />
        </Link>
        <RatingStars
          maxRating={5}
          color=""
          size={24}
          defaultRating={itemRating}
          setUserRating={setItemRating}
        />
        <span>
          {inCart ? (
            <span className="in-cart">{itemInCart}</span>
          ) : (
            <Button
              onClick={handleAddItemToCart}
              type="button"
              className="button-light"
              text="add to cart"
            />
          )}
        </span>
      </div>
    </li>
  );
}
