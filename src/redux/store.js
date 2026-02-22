import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "../features/cart/cartSlice";
import addressReducer from "../features/address/addressSlice";
import ratingReducer from "../features/rating/ratingSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    address: addressReducer,
    rating: ratingReducer,
  },
});