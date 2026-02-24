import { CheckCircle, XCircle, Clock, Package, Truck, Mail, Phone, MapPin } from "lucide-react";

const StoreOrdersView = ({
  pedidos,
  stats,
  filtroEstado,
  onChangeFiltro,
  onRefresh,
  onSelectPedido,
  pedidoSeleccionado,
  modalAbierto,
  onCloseModal,
  onUpdateEstado,
  currency,
}) => {
  const getEstadoIcon = (estado) => {
    switch (estado) {
      case "pendiente":
        return <Clock className="text-yellow-500" size={16} />;
      case "procesando":
        return <Package className="text-blue-500" size={16} />;
      case "enviado":
        return <Truck className="text-purple-500" size={16} />;
      case "entregado":
        return <CheckCircle className="text-green-500" size={16} />;
      case "cancelado":
        return <XCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-gray-500" size={16} />;
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "procesando":
        return "bg-blue-100 text-blue-800";
      case "enviado":
        return "bg-purple-100 text-purple-800";
      case "entregado":
        return "bg-green-100 text-green-800";
      case "cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-GT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const pedidosFiltrados = filtroEstado === "todos"
    ? pedidos
    : pedidos.filter((pedido) => pedido.estado === filtroEstado);

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl text-slate-500 mb-2">
        Pedidos de la <span className="text-slate-800 font-semibold">Tienda</span>
      </h1>
      <p className="text-slate-400 text-sm mb-6">
        Gestiona y monitorea todos los pedidos de tus clientes
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Total Pedidos</p>
              <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            </div>
            <div className="bg-slate-100 p-2 rounded-full">
              <Package className="text-slate-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendientes}</p>
            </div>
            <div className="bg-yellow-100 p-2 rounded-full">
              <Clock className="text-yellow-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Procesando</p>
              <p className="text-2xl font-bold text-blue-600">{stats.procesando}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <Package className="text-blue-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Enviados</p>
              <p className="text-2xl font-bold text-purple-600">{stats.enviados}</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <Truck className="text-purple-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Entregados</p>
              <p className="text-2xl font-bold text-green-600">{stats.entregados}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="text-green-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <div className="flex gap-2">
          <button
            onClick={() => onChangeFiltro("todos")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filtroEstado === "todos" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-700"
            }`}
            type="button"
          >
            Todos ({stats.total})
          </button>
          <button
            onClick={() => onChangeFiltro("pendiente")}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
              filtroEstado === "pendiente"
                ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                : "bg-slate-100 text-slate-700"
            }`}
            type="button"
          >
            <Clock size={14} />
            Pendientes ({stats.pendientes})
          </button>
          <button
            onClick={() => onChangeFiltro("procesando")}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
              filtroEstado === "procesando"
                ? "bg-blue-100 text-blue-800 border border-blue-300"
                : "bg-slate-100 text-slate-700"
            }`}
            type="button"
          >
            <Package size={14} />
            Procesando ({stats.procesando})
          </button>
          <button
            onClick={() => onChangeFiltro("enviado")}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
              filtroEstado === "enviado"
                ? "bg-purple-100 text-purple-800 border border-purple-300"
                : "bg-slate-100 text-slate-700"
            }`}
            type="button"
          >
            <Truck size={14} />
            Enviados ({stats.enviados})
          </button>
          <button
            onClick={() => onChangeFiltro("entregado")}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
              filtroEstado === "entregado"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-slate-100 text-slate-700"
            }`}
            type="button"
          >
            <CheckCircle size={14} />
            Entregados ({stats.entregados})
          </button>
        </div>

        <button
          onClick={onRefresh}
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 text-sm"
          type="button"
        >
          Actualizar
        </button>
      </div>

      {pedidos.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
          <Package className="mx-auto text-slate-300" size={48} />
          <p className="text-slate-500 mt-4">No hay pedidos registrados</p>
          <p className="text-slate-400 text-sm mt-1">Los pedidos de los clientes apareceran aqui</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-slate-200">
          <table className="w-full text-sm text-left text-slate-700">
            <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
              <tr>
                {[
                  "ID",
                  "Cliente",
                  "Total",
                  "Pago",
                  "Productos",
                  "Estado",
                  "Fecha",
                  "Acciones",
                ].map((encabezado) => (
                  <th key={encabezado} className="px-6 py-3 font-medium">
                    {encabezado}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {pedidosFiltrados.map((pedido) => (
                <tr
                  key={pedido.id}
                  className="hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
                  onClick={() => onSelectPedido(pedido)}
                >
                  <td className="pl-6 py-4 font-mono text-sm">
                    #{pedido.id.toString().padStart(6, "0")}
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium">{pedido.cliente_nombre}</p>
                      <p className="text-slate-500 text-xs">{pedido.cliente_email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-800">
                    {currency} {parseFloat(pedido.total).toFixed(2)}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      pedido.metodo_pago === "COD"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}>
                      {pedido.metodo_pago === "COD" ? "Contra entrega" : "Tarjeta/Online"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full">
                      {pedido.productos?.length || 0} productos
                    </span>
                  </td>
                  <td className="px-4 py-4" onClick={(event) => event.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      {getEstadoIcon(pedido.estado)}
                      <select
                        value={pedido.estado}
                        onChange={(event) => onUpdateEstado(pedido.id, event.target.value)}
                        className={`border-none rounded-md text-sm font-medium focus:ring-0 ${getEstadoColor(pedido.estado)}`}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="procesando">Procesando</option>
                        <option value="enviado">Enviado</option>
                        <option value="entregado">Entregado</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-500 text-xs">
                    {formatDate(pedido.fecha_pedido)}
                  </td>
                  <td className="px-4 py-4" onClick={(event) => event.stopPropagation()}>
                    <button
                      onClick={() => onSelectPedido(pedido)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      type="button"
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalAbierto && pedidoSeleccionado && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Pedido #{pedidoSeleccionado.id.toString().padStart(6, "0")}
                  </h2>
                  <p className="text-slate-500 text-sm">
                    {formatDate(pedidoSeleccionado.fecha_pedido)}
                  </p>
                </div>
                <button
                  onClick={onCloseModal}
                  className="text-slate-500 hover:text-slate-700 text-2xl"
                  type="button"
                >
                  x
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-lg p-5">
                  <h3 className="font-semibold text-lg text-slate-800 mb-4 flex items-center gap-2">
                    Informacion del Cliente
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded">
                        <Mail className="text-slate-400" size={16} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Nombre</p>
                        <p className="font-medium">{pedidoSeleccionado.cliente_nombre}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded">
                        <Mail className="text-slate-400" size={16} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Email</p>
                        <p className="font-medium">{pedidoSeleccionado.cliente_email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded">
                        <Phone className="text-slate-400" size={16} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Telefono</p>
                        <p className="font-medium">{pedidoSeleccionado.cliente_telefono}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-5">
                  <h3 className="font-semibold text-lg text-slate-800 mb-4 flex items-center gap-2">
                    <MapPin className="text-slate-600" size={20} />
                    Direccion de Entrega
                  </h3>
                  {pedidoSeleccionado.direccion_entrega && (
                    <div className="space-y-2">
                      <p><strong>Calle:</strong> {pedidoSeleccionado.direccion_entrega.calle}</p>
                      <p><strong>Ciudad:</strong> {pedidoSeleccionado.direccion_entrega.ciudad}</p>
                      <p><strong>Estado:</strong> {pedidoSeleccionado.direccion_entrega.estado}</p>
                      <p><strong>Codigo Postal:</strong> {pedidoSeleccionado.direccion_entrega.codigo_postal}</p>
                      <p><strong>Pais:</strong> {pedidoSeleccionado.direccion_entrega.pais}</p>
                      {pedidoSeleccionado.direccion_entrega.telefono && (
                        <p><strong>Telefono:</strong> {pedidoSeleccionado.direccion_entrega.telefono}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-lg text-slate-800 mb-4">
                  Productos ({pedidoSeleccionado.productos?.length || 0})
                </h3>
                <div className="space-y-3">
                  {pedidoSeleccionado.productos?.map((producto, index) => (
                    <div key={index} className="flex items-center justify-between border border-slate-200 rounded-lg p-4 hover:bg-slate-50">
                      <div className="flex items-center gap-4">
                        <img
                          src={producto.imagen || "/default-image.png"}
                          alt={producto.nombre}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(event) => {
                            event.currentTarget.src = "/default-image.png";
                          }}
                        />
                        <div>
                          <p className="font-medium">{producto.nombre}</p>
                          <p className="text-sm text-slate-500">
                            {currency}{producto.precio_unitario?.toFixed(2)} x {producto.cantidad}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {currency} {producto.total?.toFixed(2)}
                        </p>
                        <p className="text-sm text-slate-500">ID: {producto.id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-slate-50 rounded-lg p-5">
                <h3 className="font-semibold text-lg text-slate-800 mb-4">Resumen del Pedido</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal:</span>
                    <span className="font-medium">{currency} {parseFloat(pedidoSeleccionado.subtotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Envio:</span>
                    <span className="font-medium">{currency} {parseFloat(pedidoSeleccionado.envio).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-lg font-semibold text-slate-800">Total:</span>
                    <span className="text-lg font-bold text-green-600">
                      {currency} {parseFloat(pedidoSeleccionado.total).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Metodo de pago:</span>
                    <span className="font-medium">
                      {pedidoSeleccionado.metodo_pago === "COD" ? "Contra entrega" : "Tarjeta/Online"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Estado actual:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(pedidoSeleccionado.estado)}`}>
                      {pedidoSeleccionado.estado}
                    </span>
                  </div>
                  {pedidoSeleccionado.notas && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-slate-600 mb-1">Notas:</p>
                      <p className="text-slate-700 bg-white p-3 rounded border">{pedidoSeleccionado.notas}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={onCloseModal}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
                  type="button"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  type="button"
                >
                  Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreOrdersView;
