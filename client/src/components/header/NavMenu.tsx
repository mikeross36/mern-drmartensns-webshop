import { useAppContext, useAuthContext } from "../../hooks";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ERoutes } from "../../types/links";
import NavMenuLink from "./NavMenuLinks";
import DropDownMenu from "./DropDownMenu";

export default function NavMenu() {
  const { showMobMenu, setShowMobMenu, isTopOfPage } = useAppContext();
  const authContext = useAuthContext();
  const userInfo = authContext?.state.authUser;
  // console.log(userInfo);

  return (
    <div
      className={`nav__menu ${showMobMenu && "show-menu"}`}
      onClick={() => setShowMobMenu(false)}
    >
      <AiOutlineClose size={30} className="nav__close" />
      <ul className={`nav__list ${isTopOfPage ? "" : "scroll-icon"}`}>
        <li className="nav__item">
          <NavMenuLink page="home" />
        </li>
        <li className="nav__item">
          <NavMenuLink page="shop" />
        </li>
        <li className="nav__item">
          <NavMenuLink page="categories" />
        </li>
        <li className="nav__item">
          <NavMenuLink page="about" />
        </li>
        <li className="nav__item">
          <NavMenuLink page="FAQ" />
        </li>
        {!userInfo ? (
          <li className="nav__item">
            <Link
              to={ERoutes.authpage}
              className={`route__link ${isTopOfPage ? "" : "scroll-icon"}`}
            >
              login
            </Link>
          </li>
        ) : (
          <li className="nav__item" onClick={(e) => e.stopPropagation()}>
            <DropDownMenu />
          </li>
        )}
      </ul>
    </div>
  );
}
