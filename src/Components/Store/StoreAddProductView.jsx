const StoreAddProductView = ({
  categorias,
  infoProducto,
  imagen,
  onImageChange,
  onInfoChange,
  onCategoriaChange,
  onSubmitCategoria,
  nuevaCategoria,
  onNuevaCategoriaChange,
  onSubmitProducto,
  loading,
}) => {
  return (
    <div className="text-slate-600 mb-20 px-3">
      <div className="bg-white border border-slate-300/30 rounded-xl p-5 shadow-sm mb-10">
        <h2 className="text-xl font-bold text-slate-800">Agregar Categoria</h2>

        <form onSubmit={onSubmitCategoria} className="mt-4 flex gap-3 flex-col sm:flex-row">
          <input
            type="text"
            value={nuevaCategoria}
            onChange={(event) => onNuevaCategoriaChange(event.target.value)}
            placeholder="Nueva categoria"
            className="p-2 border border-slate-300/40 rounded-lg w-full outline-none"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" type="submit">
            Agregar
          </button>
        </form>
      </div>

      <div className="bg-white border border-slate-300/30 rounded-xl p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Agregar Producto</h1>

        <form onSubmit={onSubmitProducto} className="mt-6">
          <p className="mb-2">Imagen del producto (opcional)</p>

          <label>
            <img
              className="h-32 w-32 object-cover border border-slate-300/40 rounded-xl cursor-pointer"
              src={imagen ? URL.createObjectURL(imagen) : "/upload_area.svg"}
              alt="Imagen del producto"
            />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(event) => onImageChange(event.target.files[0])}
            />
          </label>

          <label className="flex flex-col my-4">
            Nombre
            <input
              type="text"
              name="nombre"
              onChange={onInfoChange}
              value={infoProducto.nombre}
              className="p-2 border border-slate-300/40 rounded-lg outline-none"
              required
            />
          </label>

          <label className="flex flex-col my-4">
            Descripcion
            <textarea
              name="descripcion"
              onChange={onInfoChange}
              value={infoProducto.descripcion}
              rows="4"
              className="p-2 border border-slate-300/40 rounded-lg outline-none resize-none"
              required
            ></textarea>
          </label>

          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex flex-col w-full">
              Precio Original
              <input
                type="number"
                name="precio_original"
                onChange={onInfoChange}
                value={infoProducto.precio_original}
                className="p-2 border border-slate-300/40 rounded-lg outline-none"
                required
              />
            </label>

            <label className="flex flex-col w-full">
              Precio Oferta
              <input
                type="number"
                name="precio_oferta"
                onChange={onInfoChange}
                value={infoProducto.precio_oferta}
                className="p-2 border border-slate-300/40 rounded-lg outline-none"
                required
              />
            </label>
          </div>

          <label className="flex flex-col my-4">
            Categoria
            <select
              value={infoProducto.categoria}
              onChange={(event) => onCategoriaChange(event.target.value)}
              className="p-2 border border-slate-300/40 rounded-lg outline-none"
              required
            >
              <option value="">Selecciona una categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nombre}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </label>

          <button
            disabled={loading}
            className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-black transition mt-2"
            type="submit"
          >
            {loading ? "Agregando..." : "Agregar Producto"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StoreAddProductView;
