import Title from "../Common/Title";
import ProductCard from "../Common/ProductCard";

const LatestProductsView = ({
  products,
  loading,
  error,
  onRetry,
  currency,
  cartItems,
  onAddToCart,
  onIncrement,
  onDecrement,
}) => {
  if (loading) {
    return (
      <div className="px-6 my-30 max-w-6xl mx-auto">
        <Title title="Electrodomesticos" description="Cargando productos..." />
        <div className="mt-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800"></div>
          <p className="mt-2 text-slate-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 my-30 max-w-6xl mx-auto">
        <Title title="Utiles Escolares" description="Error al cargar productos" />
        <div className="mt-12 text-center text-red-500">
          <p>Error: {error}</p>
          <button
            onClick={onRetry}
            className="mt-4 bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900"
            type="button"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="px-6 my-30 max-w-6xl mx-auto">
        <Title title="Utiles Escolares" description="No hay productos disponibles" />
        <div className="mt-12 text-center">
          <p className="text-slate-600">No se encontraron productos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 my-30 max-w-6xl mx-auto">
      <Title
        title="Electrodomesticos"
        description={`Se muestran ${products.length} disponibles`}
        href="/shop"
      />

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const productId = product.id;
          const quantity = cartItems[productId] || 0;

          return (
            <ProductCard
              key={productId}
              product={product}
              currency={currency}
              isInCart={quantity > 0}
              quantity={quantity}
              onAddToCart={(event) => {
                event.preventDefault();
                onAddToCart(productId);
              }}
              onIncrement={(event) => {
                event.preventDefault();
                onIncrement(productId);
              }}
              onDecrement={(event) => {
                event.preventDefault();
                onDecrement(productId);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LatestProductsView;
