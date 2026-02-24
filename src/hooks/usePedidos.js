import { useCallback, useEffect, useMemo, useState } from "react";
import { pedidosApi } from "../api/pedidosApi";

const buildStats = (pedidos) => {
  const base = {
    total: pedidos.length,
    pendientes: 0,
    procesando: 0,
    enviados: 0,
    entregados: 0,
  };

  pedidos.forEach((pedido) => {
    if (pedido.estado === "pendiente") {
      base.pendientes += 1;
    } else if (pedido.estado === "procesando") {
      base.procesando += 1;
    } else if (pedido.estado === "enviado") {
      base.enviados += 1;
    } else if (pedido.estado === "entregado") {
      base.entregados += 1;
    }
  });

  return base;
};

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPedidos = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: apiError } = await pedidosApi.select({
      order: { column: "fecha_pedido", ascending: false },
    });

    if (apiError) {
      setError(apiError);
      setPedidos([]);
    } else {
      setPedidos(data || []);
    }

    setLoading(false);
  }, []);

  const createPedido = useCallback(async (pedidoData) => {
    setLoading(true);
    setError(null);

    const { data, error: apiError } = await pedidosApi.insert(pedidoData);

    if (apiError) {
      setError(apiError);
    } else {
      setPedidos((prev) => [data, ...prev]);
    }

    setLoading(false);
    return { data, error: apiError };
  }, []);

  const updateEstado = useCallback(async (pedidoId, estado) => {
    setLoading(true);
    setError(null);

    const { data, error: apiError } = await pedidosApi.update(pedidoId, {
      estado,
      updated_at: new Date().toISOString(),
    });

    if (apiError) {
      setError(apiError);
    } else {
      setPedidos((prev) =>
        prev.map((pedido) =>
          pedido.id === pedidoId ? { ...pedido, estado: data.estado } : pedido
        )
      );
    }

    setLoading(false);
    return { data, error: apiError };
  }, []);

  useEffect(() => {
    fetchPedidos();
  }, [fetchPedidos]);

  const stats = useMemo(() => buildStats(pedidos), [pedidos]);

  return {
    pedidos,
    loading,
    error,
    stats,
    fetchPedidos,
    createPedido,
    updateEstado,
  };
};
