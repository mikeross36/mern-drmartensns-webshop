import { useEffect } from "react";
import {
  useAppContext,
  useAuthContext,
  useShoppingCartDispatch,
} from "../../hooks";
import { FaWindowClose } from "react-icons/fa";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../shopping-cart-state/store";
import { ShoppingCartStateType } from "../../shopping-cart-state/reducers";
import { CartItemType } from "../../types/shopping-cart";
import { Link, useNavigate } from "react-router-dom";
import { ERoutes } from "../../types/links";
import { formatCurrency } from "../../utils";
import {
  getTotalsAction,
  clearShoppingCartAction,
} from "../../shopping-cart-state/action-creators";
import { ShoppingCartActionType } from "../../shopping-cart-state/action-types";
import { removePersistedData } from "../../shopping-cart-state/store";
import Button from "../Button";
import CartItem from "./CartItem";

export default function ShoppingCart(): JSX.Element {
  const { isCartOpen, setIsCartOpen } = useAppContext();
  const { cartItems, cartTotal } = useAppSelector(
    (state: RootState) => state.shoppingCart as ShoppingCartStateType
  );
  const authContext = useAuthContext();
  const userInfo = authContext?.state.authUser;
  const dispatch = useShoppingCartDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotalsAction() as unknown as ShoppingCartActionType);
  }, [cartItems, dispatch]);

  function handleCheckout() {
    navigate(ERoutes.shipping);
    setIsCartOpen(false);
  }

  function handleClearShoppingCart() {
    const confirmed = window.confirm(
      "Are you sure you want to clear shopping cart?"
    );
    if (confirmed) {
      dispatch(clearShoppingCartAction() as unknown as ShoppingCartActionType);
      removePersistedData();
    }
  }

  return (
    <section className="shopping__cart">
      <div className={`sidebar__overlay ${isCartOpen ? "expand" : "shrink"}`}>
        <Button type="button" className="button close__cart">
          <FaWindowClose
            size={35}
            color="#fc9403"
            onClick={() => setIsCartOpen(false)}
          />
        </Button>
        {cartItems?.length === 0 ? (
          <aside className="sidebar__empty">
            <h1 className="sidebar__title">cart is empty</h1>
          </aside>
        ) : (
          <aside className="sidebar">
            <h3 className="sidebar__title">your cart</h3>
            <ul>
              {cartItems.map((item: CartItemType) => {
                return <CartItem key={item._id} item={item} />;
              })}
            </ul>
            <footer className="sidebar__footer">
              {cartItems?.length !== 0 && (
                <>
                  <div className="cart__total">
                    {!userInfo ? (
                      <Link
                        to={ERoutes.authpage}
                        onClick={() => setIsCartOpen(false)}
                      >
                        <Button
                          type="button"
                          className="button-details"
                          text="login to purchuase"
                        />
                      </Link>
                    ) : (
                      <Button
                        onClick={handleCheckout}
                        type="button"
                        className="button-details"
                        text="checkout"
                      />
                    )}
                    <h4>Total: {formatCurrency(cartTotal)}</h4>
                  </div>
                  <span className="button--clear">
                    <Button
                      onClick={handleClearShoppingCart}
                      type="button"
                      className="button-red"
                      text="clear cart"
                    />
                  </span>
                </>
              )}
            </footer>
          </aside>
        )}
      </div>
    </section>
  );
}
