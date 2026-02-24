import { useCallback, useEffect, useMemo, useState } from "react";
import { productosApi } from "../api/productosApi";

const calculateDashboard = (productos, pedidos) => {
  const totalProducts = productos.length;

  const totalRevenue = productos.reduce((sum, producto) => {
    const precioVenta = parseFloat(producto.precio_oferta || producto.precio_original) || 0;
    return sum + precioVenta;
  }, 0);

  const totalPotentialProfit = totalRevenue * 0.3;
  const totalCost = totalRevenue * 0.7;
  const averagePrice = totalProducts > 0 ? totalRevenue / totalProducts : 0;
  const outOfStock = productos.filter((producto) => producto.disponible === false).length;
  const recentProducts = productos.slice(0, 5);

  return {
    totalProducts,
    totalEarnings: totalRevenue,
    totalPotentialProfit,
    totalOrders: pedidos.length,
    totalRevenue,
    totalCost,
    averagePrice,
    recentProducts,
    outOfStock,
  };
};

export const useDashboard = (pedidos) => {
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  const fetchProductos = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: apiError } = await productosApi.select({
      order: { column: "fecha", ascending: false },
    });

    if (apiError) {
      setError(apiError);
      setProductos([]);
    } else {
      setProductos(data || []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  const dashboardData = useMemo(
    () => calculateDashboard(productos, pedidos),
    [productos, pedidos]
  );

  return {
    loading,
    error,
    dashboardData,
    refresh: fetchProductos,
  };
};
