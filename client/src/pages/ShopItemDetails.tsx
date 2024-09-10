import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ERoutes } from "../types/links";
import { useGetFootwear } from "../features/footwear";
import {
  useAuthContext,
  useShoppingCartDispatch,
  useAppContext,
} from "../hooks";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { formatCurrency } from "../utils";
import { addItemToCartAction } from "../shopping-cart-state/action-creators";
import RatingStars from "../components/stars/RatingStars";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import { FootwearType } from "../types/footwear";
import { ShoppingCartActionType } from "../shopping-cart-state/action-types";

export default function ShopItemDetails() {
  const { id } = useParams();
  const { data: footwear, status, error } = useGetFootwear(id!);
  const { setIsCartOpen } = useAppContext();

  const [footwearRating, setFootwearRating] = useState(footwear?.rating);
  const [quantity] = useState<number>(1);

  const authContext = useAuthContext();
  const userInfo = authContext?.state.authUser;
  const dispatch = useShoppingCartDispatch();
  const navigate = useNavigate();

  const coverImage = footwear?.coverImage
    ? new URL(
        `../assets/images/footwear/${footwear.coverImage}`,
        import.meta.url
      ).href
    : "";

  function handleAddItemToCart() {
    if (!footwear?._id) {
      return;
    }
    dispatch(
      addItemToCartAction(
        footwear as FootwearType & { _id: string },
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

  if (status === "pending") {
    return <Spinner />;
  } else if (error && error instanceof AxiosError) {
    toast.error(error.message);
  }

  if (!footwear) return null;

  return (
    <section className="details">
      <h2 className="section__title">footwear details</h2>
      <main className="grid">
        <div className="details__description">
          <Link to={ERoutes.home}>
            <h3 className="details__description-title">{`About ${footwear.name}`}</h3>
          </Link>
          <p className="details__description-text">{footwear.details}</p>
        </div>
        <div className="details__container">
          <div className="details__image">
            <img
              src={coverImage}
              alt="footwear cover image"
              className="details__img"
            />
          </div>
          <article className="details__data">
            <div className="details__data-list">
              <span className="details__price">
                price: {formatCurrency(footwear.price)}
              </span>
              <p>gender: {footwear.gender}</p>
              <p>category: {footwear.category}</p>
              <p>material: {footwear.material}</p>
              <p>sole height: {footwear.soleHeight}</p>
              <RatingStars
                maxRating={5}
                color="#ffa500"
                size={24}
                defaultRating={footwearRating}
                setUserRating={setFootwearRating}
              />
              <p className="care">How to care? {footwear.care}</p>
            </div>
            <div className="details__btns">
              <Button
                onClick={handleAddItemToCart}
                type="button"
                className="button-light"
                text="add to cart"
              />
              {!userInfo && (
                <Link to={ERoutes.authpage}>
                  <Button
                    type="button"
                    className="button-details"
                    text="add review"
                  />
                </Link>
              )}
            </div>
          </article>
        </div>
        {userInfo && <AddReview footwearId={footwear._id ?? ""} />}
        <Reviews footwearId={footwear._id ?? ""} />
      </main>
    </section>
  );
}
