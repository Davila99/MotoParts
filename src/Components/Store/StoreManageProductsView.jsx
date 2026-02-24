const StoreManageProductsView = ({
  productos,
  editandoId,
  formularioEdicion,
  onChangeFormulario,
  onGuardarEdicion,
  onCancelarEdicion,
  onIniciarEdicion,
  onEliminarProducto,
  onAlternarStock,
  onRefresh,
  loading,
  currency,
}) => {
  if (loading) {
    return null;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl text-slate-500 mb-5">
        Administrar <span className="text-slate-800 font-medium">Productos</span>
      </h1>

      <div className="mb-4">
        <p className="text-slate-600">
          Total de productos: <span className="font-semibold">{productos.length}</span>
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left ring ring-slate-200 rounded overflow-hidden text-sm">
          <thead className="bg-slate-50 text-gray-700 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3 hidden md:table-cell">Descripcion</th>
              <th className="px-4 py-3 hidden md:table-cell">Precio Original</th>
              <th className="px-4 py-3">Precio Oferta</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>

          <tbody className="text-slate-700">
            {productos.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-slate-500">
                  No hay productos registrados
                </td>
              </tr>
            ) : (
              productos.map((producto) => (
                <tr key={producto.id} className="border-t border-gray-200 hover:bg-gray-50">
                  {editandoId === producto.id ? (
                    <>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          name="nombre"
                          value={formularioEdicion.nombre}
                          onChange={onChangeFormulario}
                          className="border rounded px-2 py-1 w-full text-sm"
                          placeholder="Nombre del producto"
                        />
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <textarea
                          name="descripcion"
                          value={formularioEdicion.descripcion}
                          onChange={onChangeFormulario}
                          className="border rounded px-2 py-1 w-full text-sm"
                          placeholder="Descripcion"
                          rows="2"
                        />
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <input
                          type="number"
                          name="precio_original"
                          value={formularioEdicion.precio_original}
                          onChange={onChangeFormulario}
                          className="border rounded px-2 py-1 w-full text-sm"
                          step="0.01"
                          min="0"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          name="precio_oferta"
                          value={formularioEdicion.precio_oferta}
                          onChange={onChangeFormulario}
                          className="border rounded px-2 py-1 w-full text-sm"
                          step="0.01"
                          min="0"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            onChange={() => onAlternarStock(producto.id)}
                            checked={producto.disponible}
                          />
                          <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
                          <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
                        </label>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={onGuardarEdicion}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition"
                            type="button"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={onCancelarEdicion}
                            className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-400 transition"
                            type="button"
                          >
                            Cancelar
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 items-center">
                          <img
                            src={producto.images?.[0] || "/default-image.png"}
                            alt={producto.name}
                            className="w-10 h-10 object-cover p-1 shadow rounded cursor-pointer"
                            onError={(event) => {
                              event.currentTarget.src = "/default-image.png";
                            }}
                          />
                          <div>
                            <p className="font-medium">{producto.name}</p>
                            <p className="text-xs text-slate-500">ID: {producto.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 max-w-md text-slate-600 hidden md:table-cell">
                        <div className="truncate max-w-xs" title={producto.description}>
                          {producto.description || "Sin descripcion"}
                        </div>
                      </td>

                      <td className="px-4 py-3 hidden md:table-cell">
                        {currency} {(producto.originalPrice ?? producto.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>

                      <td className="px-4 py-3">
                        <span className="font-semibold">
                          {currency} {producto.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            onChange={() => onAlternarStock(producto.id)}
                            checked={producto.disponible}
                          />
                          <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
                          <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
                          <span className="text-xs ml-2">
                            {producto.disponible ? "Disponible" : "Agotado"}
                          </span>
                        </label>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => onIniciarEdicion(producto)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                            type="button"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => onEliminarProducto(producto.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                            type="button"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <button
          onClick={onRefresh}
          className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900 transition"
          type="button"
        >
          Refrescar lista de productos
        </button>
      </div>
    </div>
  );
};

export default StoreManageProductsView;
