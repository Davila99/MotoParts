import { useEffect, useState } from "react";
import Loading from "../Components/Common/Loading";
import StoreOrdersView from "../Components/Store/StoreOrdersView";
import { usePedidos } from "../hooks/usePedidos";
import { toast } from "react-hot-toast";

const StoreOrders = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "C$";
  const { pedidos, loading, stats, fetchPedidos, updateEstado } = usePedidos();
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("todos");

  useEffect(() => {
    fetchPedidos();
    const interval = setInterval(fetchPedidos, 30000);
    return () => clearInterval(interval);
  }, [fetchPedidos]);

  const handleUpdateEstado = async (pedidoId, estado) => {
    const { error } = await updateEstado(pedidoId, estado);
    if (error) {
      toast.error("Error al actualizar estado del pedido");
    } else {
      toast.success("Estado del pedido actualizado");
    }
  };

  if (loading) return <Loading />;

  return (
    <StoreOrdersView
      pedidos={pedidos}
      stats={stats}
      filtroEstado={filtroEstado}
      onChangeFiltro={setFiltroEstado}
      onRefresh={fetchPedidos}
      onSelectPedido={(pedido) => {
        setPedidoSeleccionado(pedido);
        setModalAbierto(true);
      }}
      pedidoSeleccionado={pedidoSeleccionado}
      modalAbierto={modalAbierto}
      onCloseModal={() => {
        setPedidoSeleccionado(null);
        setModalAbierto(false);
      }}
      onUpdateEstado={handleUpdateEstado}
      currency={currency}
    />
  );
};

export default StoreOrders;
