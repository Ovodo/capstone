"use client";
import React, { useContext, useEffect } from "react";
import { formatPrice } from "@/components/ProductDisplay";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/store/slice-reducers/UserReducer";
import {
  convertPriceByCountry,
  convertTotalPriceByCountry,
} from "@/helper/functions";

const Cart = () => {
  const router = useRouter();
  const { cartItems, country } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const goToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className='Cart'>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan='4'>Your cart is empty.</td>
            </tr>
          ) : (
            cartItems?.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.imageUrl} alt={item.name} />
                </td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>
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
                  } ${convertPriceByCountry(
                    item.price * item.quantity,
                    country
                  )}`}
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan='3'>Total</td>
            <td>
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
              } ${convertTotalPriceByCountry(getTotalPrice(), country)}`}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className='cart-buttons'>
        <button onClick={goToCheckout} disabled={cartItems.length === 0}>
          Go to Checkout
        </button>
        <button
          onClick={() => {
            dispatch(clearCart());
          }}
          disabled={cartItems.length === 0}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
