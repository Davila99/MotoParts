import AddressModal from "../Common/AddressModal";
import { Pencil, MapPin, CheckCircle, Package, Clock, Phone } from "lucide-react";

const OrderSummaryView = ({
  currency,
  productosDetallados,
  subtotal,
  envio,
  total,
  address,
  showAddressModal,
  onShowAddressModal,
  onHideAddressModal,
  onSaveAddress,
  paymentMethod,
  onPaymentChange,
  isLoading,
  onPlaceOrder,
  orderConfirmed,
  orderDetails,
  onContinue,
}) => {
  if (orderConfirmed && orderDetails) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Pedido Confirmado</h1>
          <p className="text-slate-600 mb-6">
            Hemos recibido tu pedido y nos pondremos en contacto contigo pronto.
          </p>
        </div>

        <div className="border border-green-200 bg-green-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Package size={20} />
            Resumen de tu pedido
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-600">Numero de pedido:</span>
              <span className="font-mono font-bold text-slate-800">{orderDetails.numero}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Fecha y hora:</span>
              <span>{orderDetails.fecha} - {orderDetails.hora}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Metodo de pago:</span>
              <span className="font-semibold">
                {orderDetails.metodoPago === "COD" ? "Contra entrega" : "Tarjeta/Online"}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-4">
              <span>Total:</span>
              <span className="text-green-600">{currency} {orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Clock size={20} />
            Que sigue
          </h3>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Recibiras un correo de confirmacion en <strong>{address.email}</strong></span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Nos contactaremos contigo al telefono <strong>{address.phone}</strong></span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>El tiempo de entrega estimado es de 2-5 dias habiles</span>
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Phone size={20} />
            Tienes preguntas
          </h3>
          <p className="text-slate-600 mb-3">
            Si necesitas hacer cambios en tu pedido o tienes alguna pregunta, contactanos:
          </p>
          <div className="space-y-2">
            <p className="text-slate-700"><strong>Telefono:</strong> +502 1234-5678</p>
            <p className="text-slate-700"><strong>Email:</strong> soporte@tecnomarketgt.com</p>
            <p className="text-slate-700"><strong>Horario:</strong> Lunes a Viernes, 8:00 AM - 6:00 PM</p>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-900 transition"
          type="button"
        >
          Continuar comprando
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Resumen del Pedido</h2>

      <div className="border border-slate-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-slate-700 mb-3">
          Productos ({productosDetallados.length})
        </h3>
        <div className="max-h-60 overflow-y-auto space-y-2">
          {productosDetallados.length === 0 ? (
            <p className="text-slate-500 text-center py-4">No hay productos en el carrito</p>
          ) : (
            productosDetallados.map((producto, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-12 h-12 object-cover rounded"
                    onError={(event) => {
                      event.currentTarget.src = "/default-image.png";
                    }}
                  />
                  <div>
                    <p className="font-medium text-sm">{producto.nombre}</p>
                    <p className="text-slate-500 text-xs">
                      {currency}{producto.precio_unitario.toFixed(2)} x {producto.cantidad}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">{currency}{producto.total.toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold text-slate-700">Metodo de Pago</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "COD"}
              onChange={() => onPaymentChange("COD")}
              className="h-4 w-4 text-slate-800"
            />
            <div>
              <span className="font-medium">Pago contra entrega</span>
              <p className="text-sm text-slate-500">Paga cuando recibas tu pedido</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "STRIPE"}
              onChange={() => onPaymentChange("STRIPE")}
              className="h-4 w-4 text-slate-800"
            />
            <div>
              <span className="font-medium">Tarjeta de credito/debito</span>
              <p className="text-sm text-slate-500">Pago seguro con Stripe</p>
            </div>
          </label>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
            <MapPin size={20} />
            Direccion de entrega
          </h3>

          <button
            onClick={onShowAddressModal}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
            type="button"
          >
            <Pencil size={16} />
            {address ? "Editar" : "Agregar"}
          </button>
        </div>

        {!address ? (
          <p className="text-slate-500 text-sm mt-2">Agrega una direccion para recibir tu pedido</p>
        ) : (
          <div className="mt-3 text-sm text-slate-700 space-y-2 p-3 bg-slate-50 rounded">
            <p><strong>{address.name}</strong></p>
            <p>{address.street}</p>
            <p>{address.city}, {address.state} {address.zip}</p>
            <p>{address.country}</p>
            <p className="pt-2 border-t border-slate-200">
              {address.email} | {address.phone}
            </p>
          </div>
        )}
      </div>

      <div className="border border-slate-200 rounded-lg p-4 space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{currency} {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Envio</span>
            <span className="text-green-600">{envio === 0 ? "Gratis" : `${currency} ${envio.toFixed(2)}`}</span>
          </div>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between text-slate-800 font-bold text-lg">
            <span>Total a pagar</span>
            <span>{currency} {total.toFixed(2)}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {paymentMethod === "COD" ? "Pagaras al recibir tu pedido" : "Se cargara a tu tarjeta"}
          </p>
        </div>

        <button
          onClick={onPlaceOrder}
          disabled={isLoading || !address || productosDetallados.length === 0}
          className="w-full mt-4 bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-900 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          type="button"
        >
          {isLoading ? "Procesando pedido..." : "Confirmar Pedido"}
        </button>

        <p className="text-xs text-slate-500 text-center mt-3">
          Al confirmar, aceptas nuestros <a href="/terms" className="text-blue-600 hover:underline">Terminos y Condiciones</a>
        </p>
      </div>

      {showAddressModal && (
        <AddressModal
          setShowAddressModal={onHideAddressModal}
          onSaveAddress={onSaveAddress}
          existingAddress={address}
        />
      )}
    </div>
  );
};

export default OrderSummaryView;
