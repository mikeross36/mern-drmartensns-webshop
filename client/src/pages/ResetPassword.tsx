import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaBackward, FaEye } from "react-icons/fa";
import { GiSteeltoeBoots } from "react-icons/gi";
import { ERoutes } from "../types/links";
import resetBcgImg from "@/assets/images/main-bcg-img.jpg";
import { useResetPassword, useLogoutUser } from "../features/auth";
import Spinner from "../components/Spinner";
import Input from "../components/Input";
import Button from "../components/Button";

export default function ResetPassword() {
  const [attributeType, setAttributeType] = useState<"password" | "text">(
    "password"
  );
  const { resetString } = useParams();
  const { mutateAsync: resetPasswordAction, isPending } = useResetPassword();
  const { mutateAsync: logoutAction } = useLogoutUser();

  function toggleAttributeType() {
    setAttributeType((prev) => (prev === "password" ? "text" : "password"));
  }

  function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    if (resetString) {
      resetPasswordAction({ resetString, password, confirmPassword });
      const timer = setTimeout(() => {
        logoutAction();
        localStorage.clear();
        window.location.reload();
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }

  if (isPending) {
    return <Spinner />;
  }

  return (
    <section className="reset__password">
      <Link to={ERoutes.home}>
        <FaBackward size={40} fill="#ffa500" />
      </Link>
      <div className="reset__background-img">
        <img src={resetBcgImg} alt="reset page background image" />
      </div>
      <div className="logo__icon">
        <GiSteeltoeBoots size={60} className="logo__icon-boot" />
        <span className="logo__icon-text">home</span>
      </div>
      <h2 className="section__title">reset password</h2>
      <div className="reset__page-container">
        <div className="reset__page-content">
          <form className="reset__form" onSubmit={handleResetPassword}>
            <div className="form__field">
              {attributeType === "password" ? (
                <Input
                  type="password"
                  name="password"
                  autoComplete="off"
                  minLength={8}
                  maxLength={24}
                  placeHolder="password..."
                  required
                />
              ) : (
                <Input
                  type="text"
                  name="password"
                  autoComplete="off"
                  minLength={8}
                  maxLength={24}
                  placeHolder="password..."
                  required
                />
              )}
              <span className="eye" onClick={toggleAttributeType}>
                <FaEye />
              </span>
            </div>
            <div className="form__field">
              {attributeType === "password" ? (
                <Input
                  type="password"
                  name="confirmPassword"
                  autoComplete="off"
                  placeHolder="password..."
                  required
                />
              ) : (
                <Input
                  type="text"
                  name="confirmPassword"
                  autoComplete="off"
                  placeHolder="confirm password..."
                  required
                />
              )}
              <span className="eye" onClick={toggleAttributeType}>
                <FaEye />
              </span>
            </div>
            <Button
              type="submit"
              className="submit__btn button-light"
              text="reset"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
