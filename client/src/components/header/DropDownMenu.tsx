import { useState, useRef } from "react";
import { useAuthContext, useAppContext } from "../../hooks";
import { FaAngleDoubleDown, FaTimes } from "react-icons/fa";
import {
  FaUserGear,
  FaCartShopping,
  FaArrowRightToBracket,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useLogoutUser } from "../../features/auth";
import { useOutSideClick } from "../../hooks";
import Spinner from "../Spinner";
import { ERoutes } from "../../types/links";

export default function DropDownMenu() {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { setShowMobMenu } = useAppContext();
  const authContext = useAuthContext();
  const userInfo = authContext?.state.authUser;
  const { mutateAsync: logoutAction, isPending } = useLogoutUser();
  const dropRef = useRef(null);

  let userPhoto;
  if (userInfo && userInfo.photo) {
    userPhoto = new URL(
      `../../assets/images/users/${userInfo.photo}`,
      import.meta.url
    ).href;
  } else {
    userPhoto = new URL(
      "../../assets/images/users/default.jpg",
      import.meta.url
    ).href;
  }

  function handleLogoutUser() {
    logoutAction();
    const timer = setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }

  function handleToggleDropdown() {
    setShowDropdown((prev) => !prev);
  }

  useOutSideClick(dropRef, () => {
    setShowDropdown(false);
  });

  if (isPending) {
    return <Spinner />;
  }

  return (
    <main className="dropdown__menu" ref={dropRef}>
      <div
        className={`dropdown__menu-content ${
          showDropdown ? "show-dropdown" : ""
        }`}
      >
        <button
          className="dropdown__menu-button"
          onClick={handleToggleDropdown}
        >
          {userInfo ? (
            <img
              src={userPhoto}
              alt="logged in user photo"
              className="dropdown__menu-user-img"
            />
          ) : (
            <img
              src={userPhoto}
              alt="logged in user photo"
              className="dropdown__menu-user-img"
            />
          )}
          <span className="dropdown__menu-user">
            <p>{userInfo?.userName.split(" ")[0]}</p>
          </span>
          <div className="dropdown__menu-icons">
            <FaAngleDoubleDown className="dropdown__arrow" />
            <FaTimes className="dropdown__close" />
          </div>
        </button>
        <ul
          onClick={() => {
            setShowMobMenu(false);
            setShowDropdown(false);
          }}
          className="dropdown__list"
        >
          <li className="dropdown__item">
            <Link to={ERoutes.useraccount}>
              <FaUserGear className="dropdown__icon" />
              <span className="dropdown__name">my account</span>
            </Link>
          </li>
          <li className="dropdown__item">
            <Link to={ERoutes.userorders}>
              <FaCartShopping className="dropdown__icon" />
              <span className="dropdown__name">my orders</span>
            </Link>
          </li>
          <li className="dropdown__item" onClick={handleLogoutUser}>
            <FaArrowRightToBracket className="dropdown__icon" />
            <span className="dropdown__name">logout</span>
          </li>
        </ul>
      </div>
    </main>
  );
}
