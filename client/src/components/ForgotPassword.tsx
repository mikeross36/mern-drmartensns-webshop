import { useForgotPassword } from "../features/auth";
import Input from "./Input";
import Button from "./Button";
import Spinner from "./Spinner";

export default function ForgotPassword() {
  const { mutateAsync: forgotPass, isPending } = useForgotPassword();

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    forgotPass({ email });
  }

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="forgot__form-container">
      <form className="forgot__form" onSubmit={handleFormSubmit}>
        <h3 className="forgot__title">enter your email</h3>
        <div className="input__control">
          <Input
            type="email"
            name="email"
            autoComplete="off"
            placeHolder="email..."
            required
          />
        </div>
        <Button type="submit" className="button-light" text="send" />
      </form>
    </div>
  );
}
