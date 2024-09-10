import { useRef } from "react";
import { createPortal } from "react-dom";
import { FaWindowClose } from "react-icons/fa";
import { useOutSideClick } from "../hooks";

type PropsType = {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({
  children,
  showModal,
  setShowModal,
}: PropsType) {
  const modalRef = useRef(null);

  useOutSideClick(modalRef, () => {
    setShowModal(false);
  });

  if (!showModal) return null;
  return createPortal(
    <main className={`modal__overlay ${showModal && "show-modal"}`}>
      <div className="modal__container" ref={modalRef}>
        <div className="modal__close" onClick={() => setShowModal(false)}>
          <FaWindowClose
            size={40}
            fill="#ffa500"
            className="modal__close-btn"
          />
        </div>
        {children}
      </div>
    </main>,
    document.getElementById("modal") as HTMLDivElement
  );
}
