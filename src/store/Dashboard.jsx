import { useEffect, useState } from "react";
import Loading from "../Components/Common/Loading";
import DashboardView from "../Components/Store/DashboardView";
import { useDashboard } from "../hooks/useDashboard";
import { usePedidos } from "../hooks/usePedidos";

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "C$";
  const [timeRange, setTimeRange] = useState("month");
  const { pedidos } = usePedidos();
  const { loading, dashboardData, refresh } = useDashboard(pedidos);

  useEffect(() => {
    const interval = setInterval(refresh, 30000);
    return () => clearInterval(interval);
  }, [refresh, timeRange]);

  if (loading) return <Loading />;

  return (
    <DashboardView
      currency={currency}
      dashboardData={dashboardData}
      timeRange={timeRange}
      onChangeRange={setTimeRange}
      onRefresh={refresh}
    />
  );
};

export default Dashboard;