import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import Counter from "./Counter";

const ProductCard = ({ product }) => {
  const currency = "Q";
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);
  const productId = product.id;

  // Siempre mostrar 4 estrellas para todos los productos
  const rating = 4; // Forzar 4 estrellas

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ productId }));
  };

  // Verificar si la imagen existe
  const productImage = product.images && product.images[0] 
    ? product.images[0] 
    : '/default-image.png';

  return (
    <Link
      to={`/product/${product.id}`}
      className="group max-xl:mx-auto no-underline"
    >
      {/* Imagen */}
      <div className="bg-[#F5F5F5] h-40 sm:w-60 sm:h-68 rounded-lg flex items-center justify-center overflow-hidden">
        <img
          src={productImage}
          alt={product.name || 'Producto'}
          className="max-h-30 sm:max-h-40 w-auto group-hover:scale-105 transition duration-300"
          onError={(e) => {
            e.target.src = '/default-image.png';
          }}
        />
      </div>

      {/* Información del producto */}
      <div className="flex flex-col gap-2 text-slate-800 pt-2 max-w-60">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">{product.name || 'Sin nombre'}</p>
          <p className="text-sm font-semibold">
            {currency}
            {product.price ? product.price.toFixed(2) : '0.00'}
          </p>
        </div>

        {/* Rating - Siempre 4 estrellas */}
        <div className="flex">
          {Array(5)
            .fill("")
            .map((_, index) => (
              <StarIcon
                key={index}
                size={14}
                className="text-transparent mt-0.5"
                fill={rating >= index + 1 ? "#00C950" : "#D1D5DB"}
              />
            ))}
        </div>

        {/* Botones de acción */}
        <div className="mt-2">
          {!cart[productId] ? (
            <button
              onClick={handleAddToCart}
              className="w-full bg-slate-800 text-white text-sm py-1 rounded hover:bg-slate-900 transition cursor-pointer"
            >
              Agregar al carrito
            </button>
          ) : (
            <Counter productId={productId} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;