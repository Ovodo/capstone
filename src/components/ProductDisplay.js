import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slice-reducers/UserReducer";
import { convertPriceByCountry } from "@/helper/functions";
import Modal from "./Modal";

const maleProducts = [
  { id: 1, name: "Hoodie", price: 10, imageUrl: "men1.jpg" },
  { id: 2, name: "T-Shirt", price: 15, imageUrl: "men2.jpg" },
  { id: 3, name: "T-Shirt", price: 15, imageUrl: "men3.jpg" },
  { id: 4, name: "T-Shirt", price: 15, imageUrl: "men4.jpg" },
  { id: 5, name: "T-Shirt", price: 15, imageUrl: "men5.jpg" },
];
const femaleProducts = [
  { id: 1, name: "Hoodie", price: 10, imageUrl: "women1.jpg" },
  { id: 2, name: "T-Shirt", price: 15, imageUrl: "women2.jpg" },
  { id: 3, name: "T-Shirt", price: 15, imageUrl: "women3.jpg" },
  { id: 4, name: "T-Shirt", price: 15, imageUrl: "women4.jpg" },
  { id: 5, name: "T-Shirt", price: 15, imageUrl: "women5.jpg" },
];

const ProductDisplay = () => {
  const dispatch = useDispatch();
  const [selectedGender, setSelectedGender] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const { gender, country } = useSelector((state) => state.user);

  useEffect(() => {
    setProducts(gender === "male" ? maleProducts : femaleProducts);
    setSelectedGender(gender);
  }, [gender]);

  const addToCartAndShowModal = (product) => {
    dispatch(addToCart(product));
    setShowModal(true);
    // Show modal here
  };
  const closeModal = () => setShowModal(false);

  const animateProducts = (gender) => {
    setSelectedGender(gender);
    setProducts(gender === "male" ? maleProducts : femaleProducts);
  };

  return (
    <div>
      <div>
        <button
          className={`${selectedGender === "male" ? "bg-red-300" : ""}`}
          onClick={() => animateProducts("male")}
        >
          Male
        </button>
        <button
          className={`${selectedGender === "female" ? "bg-red-300" : ""}`}
          onClick={() => animateProducts("female")}
        >
          Female
        </button>
      </div>
      <motion.div
        className='ProductDisplay'
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {products.map((product) => (
          <div key={product.id} className='ProductItem'>
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>
              {`${
                country === "Nigeria"
                  ? "₦"
                  : country === "England"
                  ? "£"
                  : country === "Canada"
                  ? "$"
                  : country === "Japan"
                  ? "¥"
                  : country === "SouthAfrica"
                  ? "R"
                  : country === "Ghana"
                  ? "₵"
                  : "$"
              } ${convertPriceByCountry(product.price, country)}`}
            </p>
            <button onClick={() => addToCartAndShowModal(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </motion.div>
      {showModal && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default ProductDisplay;
