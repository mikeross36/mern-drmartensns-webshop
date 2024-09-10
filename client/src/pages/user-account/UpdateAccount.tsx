import { useState } from "react";
import { useAuthContext } from "../../hooks";
import Button from "../../components/Button";
import { useUpdateUserAccount } from "../../features/user";
import Spinner from "../../components/Spinner";
// import { toast } from "react-toastify";
import defaultImg from "@/assets/images/users/default.jpg";

export default function UpdateAccount() {
  const authContext = useAuthContext();
  const userInfo = authContext?.state.authUser;

  const [userName, setUserName] = useState(userInfo ? userInfo.userName : "");
  const [email, setEmail] = useState(userInfo ? userInfo.email : "");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState(defaultImg);

  const { mutateAsync: updateAccountAction, isPending } =
    useUpdateUserAccount();

  function handleSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
      // console.log(file);
    }
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (photo) {
      formData.append("photo", photo);
    }
    console.log(photo);
    updateAccountAction(
      { userName, email, formData },
      {
        onSettled: () => {
          setUserName("");
          setEmail("");
        },
      }
    );
  }
  if (isPending) {
    return <Spinner />;
  }
  return (
    <div className="user__account-form-container">
      <form className="form__user-data" onSubmit={handleFormSubmit}>
        <h4 className="form__title">data update</h4>
        <div className="form__field">
          <input
            type="text"
            name="userName"
            autoComplete="false"
            className="form__input"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form__field">
          <input
            type="email"
            name="email"
            autoComplete="false"
            className="form__input"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form__field-photo">
          <img
            src={photoPreview ? photoPreview : defaultImg}
            alt="update account user photo"
            className="form__user-photo"
          />
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            onChange={handleSelectFile}
          />
        </div>
        <span>
          <Button type="submit" className="button button-light" text="update" />
        </span>
      </form>
    </div>
  );
}
