import { useNavigate, useParams } from "react-router-dom";
import ProductDetailsView from "../Components/ProductDetails/ProductDetailsView";
import { useCart } from "../hooks/useCart";
import { useProductDetails } from "../hooks/useProductDetails";
import { useProductos } from "../hooks/useProductos";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "C$";
  const { productos } = useProductos();
  const { cartItems, addItem, removeItem } = useCart();

  const product = productos.find((item) => item.id === id || item.id === Number(id));
  const { mainImage, setMainImage, averageRating } = useProductDetails(product);
  const productId = product?.id;
  const cartQuantity = productId ? cartItems[productId] || 0 : 0;

  return (
    <ProductDetailsView
      product={product}
      currency={currency}
      mainImage={mainImage}
      onSelectImage={setMainImage}
      averageRating={averageRating}
      cartQuantity={cartQuantity}
      onAddToCart={() => productId && addItem(productId)}
      onGoToCart={() => navigate("/cart")}
      onIncrement={() => productId && addItem(productId)}
      onDecrement={() => productId && removeItem(productId)}
    />
  );
};

export default ProductDetails;