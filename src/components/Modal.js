import { useRouter } from "next/navigation";
import React from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ closeModal }) => {
  const navigate = useRouter();

  const goToCart = () => {
    closeModal();
    navigate.push("/cart");
  };

  return (
    <div className='ModalOverlay'>
      <div className='Modal'>
        <p>Item successfully added to cart!</p>
        <button onClick={goToCart}>Go to Cart</button>
        <button onClick={closeModal}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default Modal;
