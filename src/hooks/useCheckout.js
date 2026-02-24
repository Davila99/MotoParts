import { useMemo, useState } from "react";
import { useCart } from "./useCart";
import { usePedidos } from "./usePedidos";

const buildProductos = (cartItems, products) => {
  const detalles = [];
  let subtotal = 0;

  Object.entries(cartItems).forEach(([productId, quantity]) => {
    const product = products.find(
      (item) => item.id === productId || item.id === Number(productId)
    );

    if (!product) {
      return;
    }

    const precio = product.price || 0;
    const totalProducto = precio * quantity;
    subtotal += totalProducto;

    detalles.push({
      id: product.id,
      nombre: product.name,
      precio_unitario: precio,
      cantidad: quantity,
      total: totalProducto,
      imagen: product.images?.[0] || "/default-image.png",
    });
  });

  return { detalles, subtotal };
};

export const useCheckout = (products) => {
  const { cartItems, clear } = useCart();
  const { createPedido } = usePedidos();
  const [address, setAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isLoading, setIsLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const { detalles, subtotal } = useMemo(
    () => buildProductos(cartItems, products),
    [cartItems, products]
  );

  const envio = 0;
  const total = subtotal + envio;

  const placeOrder = async () => {
    if (!address || detalles.length === 0) {
      return { data: null, error: new Error("Pedido invalido") };
    }

    setIsLoading(true);

    const pedidoData = {
      cliente_nombre: address.name,
      cliente_email: address.email,
      cliente_telefono: address.phone,
      total,
      subtotal,
      envio,
      metodo_pago: paymentMethod,
      estado: "pendiente",
      direccion_entrega: {
        nombre: address.name,
        email: address.email,
        calle: address.street,
        ciudad: address.city,
        estado: address.state,
        codigo_postal: address.zip,
        pais: address.country,
        telefono: address.phone,
      },
      productos: detalles,
      notas: `Metodo de pago: ${paymentMethod === "COD" ? "Contra entrega" : "Tarjeta/Online"}`,
      fecha_pedido: new Date().toISOString(),
      session_id: `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    };

    const { data, error } = await createPedido(pedidoData);

    if (!error && data) {
      setOrderDetails({
        id: data.id,
        numero: data.id.slice(0, 8).toUpperCase(),
        fecha: new Date().toLocaleDateString("es-GT"),
        hora: new Date().toLocaleTimeString("es-GT", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        total,
        metodoPago: paymentMethod,
      });
      setOrderConfirmed(true);
      clear();
    }

    setIsLoading(false);
    return { data, error };
  };

  return {
    address,
    setAddress,
    showAddressModal,
    setShowAddressModal,
    paymentMethod,
    setPaymentMethod,
    isLoading,
    orderConfirmed,
    orderDetails,
    productosDetallados: detalles,
    subtotal,
    envio,
    total,
    placeOrder,
    setOrderConfirmed,
    setOrderDetails,
  };
};
