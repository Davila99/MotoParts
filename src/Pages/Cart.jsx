import { Trash2Icon } from "lucide-react";
import PageTitle from "../Components/Common/PageTitle";
import Counter from "../Components/Common/Counter";
import OrderSummaryView from "../Components/Cart/OrderSummaryView";
import { useCart } from "../hooks/useCart";
import { useCartItems } from "../hooks/useCartItems";
import { useCheckout } from "../hooks/useCheckout";
import { useProductos } from "../hooks/useProductos";
import toast from "react-hot-toast";

const Cart = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "C$";
  const { productos } = useProductos();
  const { cartItems, addItem, removeItem, deleteItem } = useCart();
  const cartArray = useCartItems(cartItems, productos);
  const checkout = useCheckout(productos);

  const handlePlaceOrder = async () => {
    if (!checkout.address) {
      toast.error("Por favor agrega una direccion antes de realizar el pedido.");
      return;
    }

    if (checkout.productosDetallados.length === 0) {
      toast.error("El carrito esta vacio.");
      return;
    }

    const result = await checkout.placeOrder();
    if (result.error) {
      toast.error(result.error.message || "Error al realizar el pedido");
    } else {
      toast.success("Pedido confirmado exitosamente");
    }
  };

  if (cartArray.length === 0) {
    return (
      <div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400">
        <h1 className="text-2xl sm:text-4xl font-semibold">Tu carrito esta vacio</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen mx-6 text-slate-800">
      <div className="max-w-7xl mx-auto">
        <PageTitle heading="Mi Carrito" text="Articulos en tu carrito" linkText="Agregar mas" />

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
                      <img src={item.images[0]} className="h-14 w-auto" alt={item.name} />
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
                    <Counter
                      quantity={item.quantity}
                      onIncrement={() => addItem(item.id)}
                      onDecrement={() => removeItem(item.id)}
                    />
                  </td>
                  <td className="text-center">
                    {currency}
                    {(item.price * item.quantity).toLocaleString()}
                  </td>
                  <td className="text-center max-md:hidden">
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 hover:bg-red-50 p-2.5 rounded-full active:scale-95 transition-all"
                      type="button"
                    >
                      <Trash2Icon size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <OrderSummaryView
            currency={currency}
            productosDetallados={checkout.productosDetallados}
            subtotal={checkout.subtotal}
            envio={checkout.envio}
            total={checkout.total}
            address={checkout.address}
            showAddressModal={checkout.showAddressModal}
            onShowAddressModal={() => checkout.setShowAddressModal(true)}
            onHideAddressModal={() => checkout.setShowAddressModal(false)}
            onSaveAddress={checkout.setAddress}
            paymentMethod={checkout.paymentMethod}
            onPaymentChange={checkout.setPaymentMethod}
            isLoading={checkout.isLoading}
            onPlaceOrder={handlePlaceOrder}
            orderConfirmed={checkout.orderConfirmed}
            orderDetails={checkout.orderDetails}
            onContinue={() => {
              checkout.setOrderConfirmed(false);
              checkout.setOrderDetails(null);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
