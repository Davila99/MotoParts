import { StarIcon, TagIcon, EarthIcon, CreditCardIcon, UserIcon } from "lucide-react";
import Counter from "../Common/Counter";

const ProductDetailsView = ({
  product,
  currency,
  mainImage,
  onSelectImage,
  averageRating,
  cartQuantity,
  onAddToCart,
  onGoToCart,
  onIncrement,
  onDecrement,
}) => {
  if (!product) {
    return <p className="text-center mt-10">Producto no encontrado</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 mt-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 w-full lg:w-1/2">
          <div className="flex sm:flex-col gap-2 order-2 sm:order-1 overflow-x-auto sm:overflow-x-visible">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => onSelectImage(image)}
                className="bg-slate-100 flex items-center justify-center size-16 sm:size-20 rounded-lg group cursor-pointer shrink-0"
                type="button"
              >
                <img
                  src={image}
                  alt={`Miniatura ${index + 1}`}
                  width={40}
                  height={40}
                  className="group-hover:scale-105 transition-transform duration-200"
                />
              </button>
            ))}
          </div>

          <div className="flex justify-center items-center bg-slate-100 rounded-lg w-full h-64 sm:h-80 lg:h-96 order-1 sm:order-2">
            <img
              src={mainImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain p-4"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-2">
            {product.name}
          </h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {Array(5)
                .fill("")
                .map((_, index) => (
                  <StarIcon
                    key={index}
                    size={16}
                    className="text-transparent"
                    fill={averageRating >= index + 1 ? "#00C950" : "#D1D5DB"}
                  />
                ))}
            </div>
            <p className="text-sm ml-2 text-slate-500">
              {product.rating?.length || 0} Reseñas
            </p>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <p className="text-2xl sm:text-3xl font-semibold text-slate-800">
              {currency}
              {product.price}
            </p>
            {product.originalPrice && (
              <p className="text-xl text-slate-500 line-through">
                {currency}
                {product.originalPrice}
              </p>
            )}
          </div>

          {product.originalPrice && (
            <div className="flex items-center gap-2 text-slate-500 mb-6">
              <TagIcon size={16} />
              <p className="text-sm sm:text-base">
                Ahorra {((product.originalPrice - product.price) / product.originalPrice * 100).toFixed(0)}%
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            {cartQuantity > 0 && (
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <p className="text-sm font-medium text-slate-800">Cantidad</p>
                <Counter
                  quantity={cartQuantity}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                />
              </div>
            )}

            <button
              onClick={cartQuantity > 0 ? onGoToCart : onAddToCart}
              className="bg-slate-800 text-white px-6 sm:px-10 py-3 text-sm font-medium rounded-lg hover:bg-slate-900 active:scale-95 transition w-full sm:w-auto text-center"
              type="button"
            >
              {cartQuantity > 0 ? "Ver carrito" : "Agregar al carrito"}
            </button>
          </div>

          <hr className="border-gray-300 my-6" />

          <div className="flex flex-col gap-3 text-slate-500">
            <div className="flex items-center gap-3">
              <EarthIcon size={18} className="text-slate-400" />
              <span className="text-sm sm:text-base">Envio gratis a todo el pais</span>
            </div>
            <div className="flex items-center gap-3">
              <CreditCardIcon size={18} className="text-slate-400" />
              <span className="text-sm sm:text-base">Pago 100% seguro</span>
            </div>
            <div className="flex items-center gap-3">
              <UserIcon size={18} className="text-slate-400" />
              <span className="text-sm sm:text-base">Confiable por marcas top</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsView;
