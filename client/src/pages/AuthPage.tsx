import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBackward, FaEye } from "react-icons/fa";
import { GiSteeltoeBoots } from "react-icons/gi";
import { ERoutes } from "../types/links";
import { useRegisterUser, useLoginUser } from "../features/auth";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/auth";
import { UserResponseType } from "../types/users";
import { useAuthContext, useAppContext } from "../hooks";
import { SET_USER } from "../contexts/AuthContextProvider";
import authBcgImg from "@/assets/images/main-bcg-img.jpg";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import Button from "../components/Button";

export default function AuthPage() {
  const [authType, setAuthType] = useState<"login" | "register">("login");
  const [attributeType, setAttributeType] = useState<"password" | "text">(
    "password"
  );
  const { setShowModalForgot } = useAppContext();

  const { mutateAsync: registerAction, isPending: isRegisterPending } =
    useRegisterUser();
  const { mutateAsync: loginAction, isPending: isLoginPending } =
    useLoginUser();

  function toggleAttributeType() {
    setAttributeType((prev) => (prev === "password" ? "text" : "password"));
  }

  function toggleAuthType() {
    setAuthType((prev) => (prev === "login" ? "register" : "login"));
  }

  const memoizedSelect = useCallback(
    (data: UserResponseType) => data.data.user,
    []
  );
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getUserInfo,
    enabled: false,
    select: memoizedSelect,
    retry: 1,
  });

  const authContext = useAuthContext();
  const dispatch = authContext?.dispatch;

  useEffect(() => {
    if (query.isSuccess && dispatch) {
      dispatch({ type: SET_USER, payload: query.data });
    }
  }, [dispatch, query.data, query.isSuccess]);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userName = formData.get("userName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (authType === "register") {
      registerAction({ userName, email, password, confirmPassword });
    } else {
      loginAction(
        { email, password },
        {
          onSuccess: async () => await query.refetch(),
        }
      );
    }
  }

  const isPending = isRegisterPending || isLoginPending;

  if (isPending) {
    return <Spinner />;
  }

  return (
    <section className="auth__page">
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
      <h2 className="section__title">
        <span>{authType === "login" ? "login" : "register"}</span>
      </h2>
      <div className="auth__page-container">
        <div className="auth__page-content">
          <form className="auth__form" onSubmit={handleFormSubmit}>
            {authType === "register" && (
              <div className="form__field">
                <Input
                  type="text"
                  name="userName"
                  autoComplete="off"
                  placeHolder="user name..."
                  required
                  disabled={isPending}
                />
              </div>
            )}
            <div className="form__field">
              <Input
                type="email"
                name="email"
                autoComplete="off"
                placeHolder="email..."
                required
                disabled={isPending}
              />
            </div>
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
                  disabled={isPending}
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
                  disabled={isPending}
                />
              )}
              <span className="eye" onClick={toggleAttributeType}>
                <FaEye />
              </span>
            </div>
            {authType === "register" && (
              <div className="form__field">
                {attributeType === "password" ? (
                  <Input
                    type="password"
                    name="confirmPassword"
                    autoComplete="off"
                    placeHolder="confirm password"
                    required
                    disabled={isPending}
                  />
                ) : (
                  <Input
                    type="text"
                    name="confirmPassword"
                    autoComplete="off"
                    placeHolder="confirm password"
                    required
                    disabled={isPending}
                  />
                )}
                <span className="eye" onClick={toggleAttributeType}>
                  <FaEye />
                </span>
                <div className="login">
                  <span>Already have an acoount?</span>
                  <Link to="#" onClick={toggleAuthType}>
                    login
                  </Link>
                </div>
              </div>
            )}
            {authType === "login" && (
              <>
                <div className="sign__up">
                  <span>Don't have an account?</span>
                  <Link to="#" onClick={toggleAuthType}>
                    register
                  </Link>
                </div>
                <div className="forgot__pass">
                  <Link to="#" onClick={() => setShowModalForgot(true)}>
                    <span>forgot password</span>
                  </Link>
                </div>
              </>
            )}
            <div className="auth__form-btn">
              <Button
                type="submit"
                className="submit__btn button-light"
                text={authType === "login" ? "login" : "register"}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
