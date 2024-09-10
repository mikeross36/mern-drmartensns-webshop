import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useAppContext } from "./hooks";
import Modal from "./components/Modal";
import ForgotPassword from "./components/ForgotPassword";

export default function App() {
  const { showModalForgot, setShowModalForgot } = useAppContext();

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Modal showModal={showModalForgot} setShowModal={setShowModalForgot}>
        <ForgotPassword />
      </Modal>
    </>
  );
}
