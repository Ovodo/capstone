// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// const useCart = () => {
//   // Define initial state for cart items
//   const [cartItems, setCartItems] = useState(() => {
//     const savedCart =
//       typeof window !== "undefined" ? localStorage.getItem("cart") : null;
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   const { cartItems } = useSelector((state) => state.user);

//   // Function to add items to the cart
//   const addToCart = (product) => {
//     setCartItems((prevItems) => {
//       let updatedItems = [];
//       const itemExists = prevItems.find((item) => item.id === product.id);
//       if (itemExists) {
//         updatedItems = prevItems.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         updatedItems = [...prevItems, { ...product, quantity: 1 }];
//       }
//       // Update localStorage with updated cart items
//       typeof window !== "undefined" &&
//         localStorage.setItem("cart", JSON.stringify(updatedItems));
//       return updatedItems;
//     });
//   };

//   // Function to clear cart items
//   const clearCart = () => {
//     setCartItems([]);
//     // Clear localStorage when cart is cleared
//     typeof window !== "undefined" && localStorage.removeItem("cart");
//   };

//   return { cartItems, addToCart, clearCart };
// };

// export default useCart;
