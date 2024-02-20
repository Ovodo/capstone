"use client";
import React, { useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";

const Checkout = () => {
  const { name, surname, email, number, country, city, postalCode, address } =
    useSelector((state) => state.user);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const router = useRouter();

  const [userData, setUserData] = useState({
    firstName: name || "",
    lastName: surname || "",
    email: email || "",
    phone: number || "",
    address: address || "",
    postalCode: postalCode || "",
    city: city || "",
    country: country || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmationModal(true);
    clearCart();
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    router.push("/");
  };
  const clearCart = () => {
    if (typeof window != "undefined") {
      sessionStorage.removeItem("cart"); // Correctly clear session storage
    }
  };

  return (
    <div className='CheckoutContainer'>
      <div className='Checkout'>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            name='firstName'
            id='firstName'
            value={userData.firstName}
            onChange={handleChange}
          />

          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            name='lastName'
            id='lastName'
            value={userData.lastName}
            onChange={handleChange}
            required
          />

          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={userData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor='phone'>Phone Number</label>
          <input
            type='text'
            name='phone'
            id='phone'
            value={userData.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor='address'>Address</label>
          <input
            type='text'
            name='address'
            id='address'
            value={userData.address}
            onChange={handleChange}
            required
          />

          <label htmlFor='postalCode'>Postal Code</label>
          <input
            type='text'
            name='postalCode'
            id='postalCode'
            value={userData.postalCode}
            onChange={handleChange}
            required
          />

          <label htmlFor='city'>City</label>
          <input
            type='text'
            name='city'
            id='city'
            value={userData.city}
            onChange={handleChange}
            required
          />

          <label htmlFor='country'>Country</label>
          <input
            type='text'
            name='country'
            id='country'
            value={userData.country}
            onChange={handleChange}
            required
          />

          <button type='submit' className='ContinueButton'>
            Submit Order
          </button>
        </form>
      </div>
      {showConfirmationModal && (
        <ConfirmationModal closeModal={closeConfirmationModal} />
      )}
    </div>
  );
};

export default Checkout;
