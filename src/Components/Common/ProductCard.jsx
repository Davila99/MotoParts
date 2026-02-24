import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Counter from "./Counter";

const ProductCard = ({
  product,
  currency,
  isInCart,
  quantity,
  onAddToCart,
  onIncrement,
  onDecrement,
}) => {
  const rating = 4;
  const productImage = product.images && product.images[0]
    ? product.images[0]
    : "/default-image.png";

  return (
    <Link to={`/product/${product.id}`} className="group max-xl:mx-auto no-underline">
      <div className="bg-[#F5F5F5] h-40 sm:w-60 sm:h-68 rounded-lg flex items-center justify-center overflow-hidden">
        <img
          src={productImage}
          alt={product.name || "Producto"}
          className="max-h-30 sm:max-h-40 w-auto group-hover:scale-105 transition duration-300"
          onError={(event) => {
            event.currentTarget.src = "/default-image.png";
          }}
        />
      </div>

      <div className="flex flex-col gap-2 text-slate-800 pt-2 max-w-60">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">{product.name || "Sin nombre"}</p>
          <p className="text-sm font-semibold">
            {currency}
            {product.price ? product.price.toFixed(2) : "0.00"}
          </p>
        </div>

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

        <div className="mt-2">
          {!isInCart ? (
            <button
              onClick={onAddToCart}
              className="w-full bg-slate-800 text-white text-sm py-1 rounded hover:bg-slate-900 transition cursor-pointer"
              type="button"
            >
              Agregar al carrito
            </button>
          ) : (
            <Counter
              quantity={quantity}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;