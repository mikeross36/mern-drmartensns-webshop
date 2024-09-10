import { useState, useRef, useTransition } from "react";
import { useAppContext, useAppSelector } from "../../hooks";
import { IoHome } from "react-icons/io5";
import {
  FaFacebook,
  FaInstagramSquare,
  FaGithub,
  FaSearch,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";
import { GiHamburgerMenu, GiSteeltoeBoots } from "react-icons/gi";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";
import { ERoutes } from "../../types/links";
import NavMenu from "./NavMenu";
import SearchForm from "../search/SearchForm";
import { toast } from "react-toastify";
import { useGetAllFootwear } from "../../features/footwear";
import { FootwearType } from "../../types/footwear";
import { AxiosError } from "axios";
import SearchList from "../search/SearchList";
import { RootState } from "../../shopping-cart-state/store";

export default function Header() {
  const [filteredFootwear, setFilteredFootwear] = useState<
    FootwearType[] | undefined
  >([]);
  const { isTopOfPage, setShowSearch, setShowMobMenu, setIsCartOpen } =
    useAppContext();
  const { itemsTotal } = useAppSelector(
    (state: RootState) => state.shoppingCart
  );
  const [isPending, startTransition] = useTransition();
  const { data: footwear } = useGetAllFootwear();

  const searchRef = useRef<HTMLInputElement>(null);

  function toggleMobMenu() {
    setShowMobMenu((prev) => !prev);
  }

  function handleSearchFootwear(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchRef.current === null || searchRef.current.value.trim() === "") {
      toast.error("Please enter a valid search term");
      return;
    }
    try {
      startTransition(() => {
        setShowSearch(false);
        const filteredResults = footwear?.filter((item) => {
          return item.name!.includes(searchRef.current!.value);
        });
        if (filteredResults && filteredResults.length > 0) {
          setFilteredFootwear(filteredResults);
        }
      });
      if (searchRef.current) {
        searchRef.current.value = "";
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.message);
      }
    }
  }

  return (
    <header className={`header ${isTopOfPage ? "" : "sroll-header"}`}>
      <div className="header__info">
        <ul className="header__info-list grid">
          <li>
            <IoHome size={20} fill="#333333" />
            <span>Main Str Novi Sad</span>
          </li>
          <div className="header__social">
            <a
              href="https://www.facebook.com/drmartens"
              target="_blank"
              rel="noreferre"
              className="social"
            >
              <FaFacebook size={20} fill="#333333" />
            </a>
            <a
              href="https://twitter.com/i/flow/login?redirect_after_login=%2Fdrmartens%2F"
              target="_blank"
              rel="noreferre"
              className="social"
            >
              <FaXTwitter size={20} fill="#333333" />
            </a>
            <a
              href="https://www.instagram.com/drmartensusa/"
              target="_blank"
              rel="noreferre"
              className="social"
            >
              <FaInstagramSquare size={20} fill="#333333" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferre"
              className="social"
            >
              <FaGithub size={20} fill="#333333" />
            </a>
          </div>
          <li>
            <MdAttachEmail size={20} fill="#333333" />
            <span>drmart@drns.con</span>
          </li>
        </ul>
      </div>
      <nav className="nav grid">
        <div className="nav__toggle" onClick={toggleMobMenu}>
          <GiHamburgerMenu
            size={30}
            className={`toggle__icon ${isTopOfPage ? "" : "scroll-icon"}`}
          />
        </div>
        <Link to={ERoutes.martens} className="nav__logo">
          <GiSteeltoeBoots
            size={40}
            className={`nav__logo-icon ${isTopOfPage ? "" : "scroll-icon"}`}
          />
          <span className={`logo__text ${isTopOfPage ? "" : "scroll-icon"}`}>
            martens
          </span>
        </Link>
        <NavMenu />
        <div className="nav__icons">
          <div className="nav__shop" onClick={() => setIsCartOpen(true)}>
            <TiShoppingCart
              size={40}
              className={`nav__shop-cart ${isTopOfPage ? "" : "scroll-icon"}`}
            />
            <span className="cart__items-quant">{itemsTotal}</span>
          </div>
          <div className="nav__search" onClick={() => setShowSearch(true)}>
            <FaSearch
              size={25}
              className={`nav__search-icon ${isTopOfPage ? "" : "scroll-icon"}`}
            />
          </div>
        </div>
        <div className="nav__search-wrapper">
          <SearchForm
            handleSearchFootwear={handleSearchFootwear}
            isPending={isPending}
            searchRef={searchRef}
          />
          {filteredFootwear && filteredFootwear.length > 0 && (
            <SearchList filteredFootwear={filteredFootwear} />
          )}
        </div>
      </nav>
    </header>
  );
}
