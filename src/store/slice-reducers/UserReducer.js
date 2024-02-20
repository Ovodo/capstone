import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  surname: "",
  gender: "",
  email: "",
  address: "",
  country: "",
  postalCode: "",
  number: "",
  city: "",
  picture: "",
  cartItems: [],
};

const layoutSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile(state, action) {
      let item = action.payload;
      state.name = item.name;
      state.gender = item.gender;
      state.email = item.email;
      state.country = item.country;
      state.address = item.address;
      state.city = item.city;
      state.surname = item.surname;
      state.postalCode = item.postalCode;
      state.number = item.number;
    },
    clearProfile(state) {
      state.name = "";
      state.gender = "";
      state.email = "";
      state.country = "";
      state.address = "";
      state.city = "";
      state.surname = "";
      state.postalCode = "";
    },
    addToCart(state, action) {
      let updatedItems = [];
      let product = action.payload;
      let prevItems = state.cartItems;
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        updatedItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...prevItems, { ...product, quantity: 1 }];
      }
      state.cartItems = updatedItems;
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const { clearCart, addToCart, updateProfile, clearProfile } =
  layoutSlice.actions;

export default layoutSlice.reducer;
