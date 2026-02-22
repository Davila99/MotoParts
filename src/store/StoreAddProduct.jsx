import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { supabase } from "../services/supabase";

const AgregarProductoTienda = () => {
  const [categorias, setCategorias] = useState([]);
  const [imagen, setImagen] = useState(null);

  const [infoProducto, setInfoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio_original: "",
    precio_oferta: "",
    categoria: "",
  });

  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [cargando, setCargando] = useState(false);

  // ================================
  // Cargar categorías
  // ================================
  const cargarCategorias = async () => {
    const { data, error } = await supabase.from("categorias").select("*");
    if (!error) setCategorias(data);
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const manejarCambio = (e) => {
    setInfoProducto({ ...infoProducto, [e.target.name]: e.target.value });
  };

  // =====================================
  // SUBIR UNA SOLA IMAGEN A SUPABASE
  // =====================================
  const subirImagen = async () => {
    if (!imagen) return null; // si no hay imagen, retornar null

    const fileName = `${Date.now()}-${imagen.name}`;

    // 1. Subir imagen
    const { error: uploadError } = await supabase.storage
      .from("productos")
      .upload(fileName, imagen);

    if (uploadError) {
      console.error(uploadError);
      toast.error("Error al subir la imagen");
      return null;
    }

    // 2. Obtener URL pública
    const { data: urlData } = supabase.storage
      .from("productos")
      .getPublicUrl(fileName);

    return urlData.publicUrl; // URL completamente funcional
  };

  // ================================
  // Agregar nueva categoría
  // ================================
  const agregarCategoria = async (e) => {
    e.preventDefault();

    if (!nuevaCategoria.trim()) {
      toast.error("Escribe un nombre para la categoría");
      return;
    }

    const { error } = await supabase
      .from("categorias")
      .insert([{ nombre: nuevaCategoria }]);

    if (!error) {
      toast.success("Categoría agregada");
      setNuevaCategoria("");
      cargarCategorias();
    } else {
      toast.error("Error al agregar categoría");
    }
  };

  // ================================
  // Enviar producto
  // ================================
  const manejarEnvio = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      if (!infoProducto.categoria) {
        toast.error("Selecciona una categoría");
        setCargando(false);
        return;
      }

      // 1. Subir la imagen y obtener URL
      const urlImagen = await subirImagen();

      // 2. Insertar en la tabla
      const { error } = await supabase.from("productos").insert([
        {
          nombre: infoProducto.nombre,
          descripcion: infoProducto.descripcion,
          precio_original: Number(infoProducto.precio_original),
          precio_oferta: Number(infoProducto.precio_oferta),
          categoria: infoProducto.categoria,
          imagen_url: urlImagen,
        },
      ]);

      if (error) {
        console.error(error);
        toast.error("Error al agregar producto");
      } else {
        toast.success("Producto agregado correctamente");

        // limpiar formulario
        setInfoProducto({
          nombre: "",
          descripcion: "",
          precio_original: "",
          precio_oferta: "",
          categoria: "",
        });

        setImagen(null);
      }
    } catch (err) {
      toast.error("Error al agregar producto");
    }

    setCargando(false);
  };

  return (
    <div className="text-slate-600 mb-20 px-3">

      {/* ============================= */}
      {/* FORMULARIO CATEGORÍAS */}
      {/* ============================= */}
      <div className="bg-white border border-slate-300/30 rounded-xl p-5 shadow-sm mb-10">
        <h2 className="text-xl font-bold text-slate-800">Agregar Categoría</h2>

        <form
          onSubmit={agregarCategoria}
          className="mt-4 flex gap-3 flex-col sm:flex-row"
        >
          <input
            type="text"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
            placeholder="Nueva categoría"
            className="p-2 border border-slate-300/40 rounded-lg w-full outline-none"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Agregar
          </button>
        </form>
      </div>

      {/* ============================= */}
      {/* FORMULARIO PRODUCTO */}
      {/* ============================= */}
      <div className="bg-white border border-slate-300/30 rounded-xl p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Agregar Producto</h1>

        <form
          onSubmit={(e) =>
            toast.promise(manejarEnvio(e), { loading: "Agregando..." })
          }
          className="mt-6"
        >
          {/* IMAGEN */}
          <p className="mb-2">Imagen del producto (opcional)</p>

          <label>
            <img
              className="h-32 w-32 object-cover border border-slate-300/40 rounded-xl cursor-pointer"
              src={
                imagen ? URL.createObjectURL(imagen) : "/upload_area.svg"
              }
            />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setImagen(e.target.files[0])}
            />
          </label>

          {/* NOMBRE */}
          <label className="flex flex-col my-4">
            Nombre
            <input
              type="text"
              name="nombre"
              onChange={manejarCambio}
              value={infoProducto.nombre}
              className="p-2 border border-slate-300/40 rounded-lg outline-none"
              required
            />
          </label>

          {/* DESCRIPCIÓN */}
          <label className="flex flex-col my-4">
            Descripción
            <textarea
              name="descripcion"
              onChange={manejarCambio}
              value={infoProducto.descripcion}
              rows="4"
              className="p-2 border border-slate-300/40 rounded-lg outline-none resize-none"
              required
            ></textarea>
          </label>

          {/* PRECIOS */}
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex flex-col w-full">
              Precio Original
              <input
                type="number"
                name="precio_original"
                onChange={manejarCambio}
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
                onChange={manejarCambio}
                value={infoProducto.precio_oferta}
                className="p-2 border border-slate-300/40 rounded-lg outline-none"
                required
              />
            </label>
          </div>

          {/* CATEGORÍA */}
          <label className="flex flex-col my-4">
            Categoría
            <select
              value={infoProducto.categoria}
              onChange={(e) =>
                setInfoProducto({ ...infoProducto, categoria: e.target.value })
              }
              className="p-2 border border-slate-300/40 rounded-lg outline-none"
              required
            >
              <option value="">Selecciona una categoría</option>

              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nombre}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </label>

          {/* BOTÓN */}
          <button
            disabled={cargando}
            className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-black transition mt-2"
          >
            {cargando ? "Agregando..." : "Agregar Producto"}
          </button>
        </form>
      </div>

    </div>
  );
};

export default AgregarProductoTienda;
