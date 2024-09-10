import { GiSteeltoeBoots } from "react-icons/gi";
import { FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ERoutes } from "../../types/links";
import authBcgImg from "@/assets/images/main-bcg-img.jpg";
import UpdateAccount from "./UpdateAccount";
import UpdatePassword from "./UpdatePassword";

export default function UserAccount() {
  return (
    <>
      <section className="user__account">
        <Link to={ERoutes.home}>
          <FaBackward size={40} fill="#ffa500" />
        </Link>
        <div className="auth__background-img">
          <img src={authBcgImg} alt="auth page background image" />
        </div>
        <div className="logo__icon">
          <GiSteeltoeBoots size={60} className="logo__icon-boot" />
          <span className="logo__icon-text">home</span>
        </div>
        <h2 className="section__title">your account</h2>
        <div className="user__account-content">
          <UpdateAccount />
          <UpdatePassword />
        </div>
      </section>
    </>
  );
}
