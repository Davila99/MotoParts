import { useEffect, useState } from "react";

import { Trash2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCart } from "../features/cart/cartSlice";
import PageTitle from "../Components/Common/PageTitle";
import Counter from "../Components/Common/Counter";
import OrderSummary from "../Components/Common/OrderSummary";

export default function Cart() {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "C$"; // Cambia a cordobas o usa variable de entorno

  const { cartItems } = useSelector((state) => state.cart);
  const products = useSelector((state) => state.product.list);

  const dispatch = useDispatch();

  const [cartArray, setCartArray] = useState([]);

  const createCartArray = () => {
    const newCartArray = [];

    for (const [key, value] of Object.entries(cartItems)) {
      const product = products.find((product) => product.id === Number(key))
      if (product) {
        newCartArray.push({
          ...product,
          quantity: value,
        });
      }
    }

    setCartArray(newCartArray);
  };

  const handleDeleteItemFromCart = (productId) => {
    dispatch(deleteItemFromCart({ productId }));
  };

  useEffect(() => {
    if (products.length > 0) {
      createCartArray();
    }
  }, [cartItems, products]);

  return cartArray.length > 0 ? (
    <div className="min-h-screen mx-6 text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <PageTitle heading="Mi Carrito" text="Artículos en tu carrito" linkText="Agregar más" />

        <div className="flex items-start justify-between gap-5 max-lg:flex-col">
          <table className="w-full max-w-4xl text-slate-600 table-auto">
            <thead>
              <tr className="max-sm:text-sm">
                <th className="text-left">Producto</th>
                <th>Cantidad</th>
                <th>Precio Total</th>
                <th className="max-md:hidden">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {cartArray.map((item, index) => (
                <tr key={index} className="space-x-2">
                  <td className="flex gap-3 my-4">
                    <div className="flex gap-3 items-center justify-center bg-slate-100 size-18 rounded-md">
                      <img
                        src={item.images[0]}
                        className="h-14 w-auto"
                        alt={item.name}
                      />
                    </div>
                    <div>
                      <p className="max-sm:text-sm">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.category}</p>
                      <p>
                        {currency}
                        {item.price}
                      </p>
                    </div>
                  </td>
                  <td className="text-center">
                    <Counter productId={item.id} />
                  </td>
                  <td className="text-center">
                    {currency}
                    {(item.price * item.quantity).toLocaleString()}
                  </td>
                  <td className="text-center max-md:hidden">
                    <button
                      onClick={() => handleDeleteItemFromCart(item.id)}
                      className="text-red-500 hover:bg-red-50 p-2.5 rounded-full active:scale-95 transition-all"
                    >
                      <Trash2Icon size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Resumen del pedido */}
          <OrderSummary />
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400">
      <h1 className="text-2xl sm:text-4xl font-semibold">
        Tu carrito está vacío
      </h1>
    </div>
  );
}
