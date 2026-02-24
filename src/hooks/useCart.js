import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  deleteItemFromCart,
  removeFromCart,
} from "../features/cart/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = useSelector((state) => state.cart.total);

  const addItem = (productId) => dispatch(addToCart({ productId }));
  const removeItem = (productId) => dispatch(removeFromCart({ productId }));
  const deleteItem = (productId) => dispatch(deleteItemFromCart({ productId }));
  const clear = () => dispatch(clearCart());

  return {
    cartItems,
    total,
    addItem,
    removeItem,
    deleteItem,
    clear,
  };
};
