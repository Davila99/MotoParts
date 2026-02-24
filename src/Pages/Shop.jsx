import { useLocation, useNavigate } from "react-router-dom";
import ShopView from "../Components/Shop/ShopView";
import { useCart } from "../hooks/useCart";
import { useProductos } from "../hooks/useProductos";

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "C$";
  const { productos } = useProductos();
  const { cartItems, addItem, removeItem } = useCart();

  const searchParams = new URLSearchParams(location.search);
  const busqueda = searchParams.get("search") || "";

  const productosFiltrados = busqueda
    ? productos.filter((producto) =>
        producto.name.toLowerCase().includes(busqueda.toLowerCase())
      )
    : productos;

  return (
    <ShopView
      products={productosFiltrados}
      searchQuery={busqueda}
      onBack={() => navigate("/shop")}
      currency={currency}
      cartItems={cartItems}
      onAddToCart={addItem}
      onIncrement={addItem}
      onDecrement={removeItem}
    />
  );
};

export default Shop;
