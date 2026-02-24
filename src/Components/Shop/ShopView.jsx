import { MoveLeft } from "lucide-react";
import ProductCard from "../../components/Common/ProductCard";

const ShopView = ({
  products = [],
  searchQuery = "",
  onBack,
  currency = "C$",
  cartItems = {},
  onAddToCart,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="min-h-[70vh] mx-6 pt-20">
      <div className="max-w-7xl mx-auto">
        <h1
          onClick={onBack}
          className="text-2xl text-slate-500 my-6 flex items-center gap-2 cursor-pointer"
        >
          {searchQuery && <MoveLeft size={20} />} Todos los{" "}
          <span className="text-slate-700 font-medium">Productos</span>
        </h1>

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto mb-32">
          {products.map((product) => {
            const quantity = cartItems[product.id] || 0;

            return (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                isInCart={quantity > 0}
                quantity={quantity}
                onAddToCart={(event) => {
                  event.preventDefault();
                  onAddToCart(product.id);
                }}
                onIncrement={(event) => {
                  event.preventDefault();
                  onIncrement(product.id);
                }}
                onDecrement={(event) => {
                  event.preventDefault();
                  onDecrement(product.id);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopView;
