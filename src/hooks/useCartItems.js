import { useMemo } from "react";

export const useCartItems = (cartItems, products) => {
  return useMemo(() => {
    const items = [];

    Object.entries(cartItems).forEach(([productId, quantity]) => {
      const product = products.find(
        (item) => item.id === Number(productId) || item.id === productId
      );

      if (!product) {
        return;
      }

      items.push({
        ...product,
        quantity,
      });
    });

    return items;
  }, [cartItems, products]);
};
