import LatestProductsView from "/src/components/home/LatestProductsView";
import { useCart } from "../../hooks/useCart";
import { useProductos } from "../../hooks/useProductos";

const LatestProducts = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "C$";
  const { productos, loading, error, fetchProductos } = useProductos();
  const { cartItems, addItem, removeItem } = useCart();

  const latestProducts = [...productos]
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 4);

  return (
    <LatestProductsView
      products={latestProducts}
      loading={loading}
      error={error ? error.message : null}
      onRetry={fetchProductos}
      currency={currency}
      cartItems={cartItems}
      onAddToCart={addItem}
      onIncrement={addItem}
      onDecrement={removeItem}
    />
  );
};

export default LatestProducts;