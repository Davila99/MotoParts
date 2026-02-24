import {
  CircleDollarSignIcon,
  ShoppingBasketIcon,
  TagsIcon,
  TrendingUpIcon,
  PackageIcon,
  CalendarIcon,
} from "lucide-react";

const DashboardView = ({
  currency,
  dashboardData,
  timeRange,
  onChangeRange,
  onRefresh,
}) => {
  const cards = [
    {
      title: "Total Productos",
      value: dashboardData.totalProducts,
      icon: ShoppingBasketIcon,
      change: "+12%",
      color: "bg-blue-500",
      description: "Productos en inventario",
    },
    {
      title: "Ingresos Totales",
      value: `${currency}${dashboardData.totalRevenue.toFixed(2)}`,
      icon: CircleDollarSignIcon,
      change: "+18%",
      color: "bg-green-500",
      description: "Ventas brutas totales",
    },
    {
      title: "Ganancia Potencial",
      value: `${currency}${dashboardData.totalPotentialProfit.toFixed(2)}`,
      icon: TrendingUpIcon,
      change: "+15%",
      color: "bg-purple-500",
      description: "30% margen de ganancia",
    },
    {
      title: "Pedidos Totales",
      value: dashboardData.totalOrders,
      icon: TagsIcon,
      change: "+8%",
      color: "bg-orange-500",
      description: "Total de ordenes",
    },
    {
      title: "Precio Promedio",
      value: `${currency}${dashboardData.averagePrice.toFixed(2)}`,
      icon: PackageIcon,
      change: "+5%",
      color: "bg-teal-500",
      description: "Precio promedio por producto",
    },
    {
      title: "Agotados",
      value: dashboardData.outOfStock,
      icon: ShoppingBasketIcon,
      change: dashboardData.outOfStock > 0 ? "Reabastecer" : "OK",
      color: "bg-red-500",
      description: "Productos sin stock",
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-GT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 text-slate-500 mb-28">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl">
            Panel de <span className="text-slate-800 font-medium">Moto Parts J&J</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Resumen completo de tu negocio</p>
        </div>

        <div className="flex gap-2 mt-4 md:mt-0">
          {["day", "week", "month", "year"].map((range) => (
            <button
              key={range}
              onClick={() => onChangeRange(range)}
              className={`px-3 py-1 text-sm rounded ${
                timeRange === range ? "bg-slate-800 text-white" : "bg-slate-100"
              }`}
              type="button"
            >
              {range === "day" && "Hoy"}
              {range === "week" && "Semana"}
              {range === "month" && "Mes"}
              {range === "year" && "Ano"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 mb-1">{card.title}</p>
                <b className="text-2xl md:text-3xl font-bold text-slate-800">{card.value}</b>
                <p className="text-xs text-slate-400 mt-2">{card.description}</p>
              </div>
              <div className={`p-3 rounded-full ${card.color} text-white`}>
                <card.icon size={24} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span
                className={`text-sm font-medium ${
                  card.change.includes("+") ? "text-green-600" : "text-red-600"
                }`}
              >
                {card.change}
              </span>
              <span className="text-xs text-slate-400 ml-2">vs. periodo anterior</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Resumen Financiero</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Ingresos Totales:</span>
              <span className="font-semibold text-green-600">
                {currency}{dashboardData.totalRevenue.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Costo Total (70%):</span>
              <span className="font-semibold text-orange-600">
                {currency}{dashboardData.totalCost?.toFixed(2) || "0.00"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Ganancia Potencial (30%):</span>
              <span className="font-semibold text-purple-600">
                {currency}{dashboardData.totalPotentialProfit.toFixed(2)}
              </span>
            </div>
            <div className="pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-slate-800">Margen de Ganancia:</span>
                <span className="text-lg font-bold text-green-600">30%</span>
              </div>
              <div className="mt-2 bg-slate-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Productos Recientes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-500 border-b">
                  <th className="pb-3">Producto</th>
                  <th className="pb-3">Precio</th>
                  <th className="pb-3">Ganancia</th>
                  <th className="pb-3">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentProducts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-slate-400">
                      No hay productos recientes
                    </td>
                  </tr>
                ) : (
                  dashboardData.recentProducts.map((producto) => (
                    <tr key={producto.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3">
                        <div className="flex items-center">
                          {producto.imagen_url && (
                            <img
                              src={producto.imagen_url}
                              alt={producto.nombre}
                              className="w-8 h-8 rounded mr-3"
                              onError={(event) => {
                                event.currentTarget.src = "/default-image.png";
                              }}
                            />
                          )}
                          <span className="font-medium text-sm">{producto.nombre}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="font-semibold">
                          {currency}{parseFloat(producto.precio_oferta || producto.precio_original).toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="text-green-600 font-medium">
                          {currency}{(parseFloat(producto.precio_oferta || producto.precio_original) * 0.3).toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-slate-500">
                        {formatDate(producto.fecha)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <ShoppingBasketIcon className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Productos Activos</p>
              <p className="text-2xl font-bold text-slate-800">{dashboardData.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <TrendingUpIcon className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Margen Promedio</p>
              <p className="text-2xl font-bold text-slate-800">30%</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <CalendarIcon className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Ultima Actualizacion</p>
              <p className="text-2xl font-bold text-slate-800">
                {new Date().toLocaleDateString("es-GT")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition"
          type="button"
        >
          Actualizar Datos
        </button>
      </div>
    </div>
  );
};

export default DashboardView;
