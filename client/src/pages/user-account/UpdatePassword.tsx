import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useUpdatePassword, useLogoutUser } from "../../features/auth";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

export default function UpdatePassword() {
  const [attributeType, setAttributeType] = useState<"password" | "text">(
    "password"
  );

  function toggleAttributeType() {
    setAttributeType((prev) => (prev === "password" ? "text" : "password"));
  }

  const { mutateAsync: updatePasswordAction, isPending } = useUpdatePassword();
  const { mutateAsync: logoutAction } = useLogoutUser();

  function handleUpdatePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    updatePasswordAction({ currentPassword, password, confirmPassword });
    const timer = setTimeout(() => {
      logoutAction();
      localStorage.clear();
      window.location.reload();
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="user__account-form-container">
      <form className="form__user-password" onSubmit={handleUpdatePassword}>
        <h4 className="form__title">password update</h4>
        <div className="form__field">
          {attributeType === "password" ? (
            <Input
              type="password"
              name="currentPassword"
              autoComplete="off"
              minLength={8}
              maxLength={24}
              placeHolder="current password..."
              required
            />
          ) : (
            <Input
              type="text"
              name="currentPassword"
              autoComplete="off"
              minLength={8}
              maxLength={24}
              placeHolder="current password..."
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
              name="password"
              minLength={8}
              maxLength={24}
              placeHolder="password..."
              required
            />
          ) : (
            <Input
              type="text"
              name="password"
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
              minLength={8}
              maxLength={24}
              placeHolder="confirm password..."
              required
            />
          ) : (
            <Input
              type="text"
              name="confirmPassword"
              autoComplete="off"
              minLength={8}
              maxLength={24}
              placeHolder="confirm password..."
              required
            />
          )}
          <span className="eye" onClick={toggleAttributeType}>
            <FaEye />
          </span>
        </div>
        <Button type="submit" className="button button-light">
          update
        </Button>
      </form>
    </div>
  );
}
