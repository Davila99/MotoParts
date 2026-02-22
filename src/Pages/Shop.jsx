import { Suspense } from "react";
import ProductCard from "../../src/Components/Common/ProductCard";
import { MoveLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function ContenidoTienda() {
  const navigate = useNavigate();
  const location = useLocation();
  const productos = useSelector((state) => state.product.list);

  // Obtener el parámetro de búsqueda ?search=ejemplo
  const searchParams = new URLSearchParams(location.search);
  const busqueda = searchParams.get("search");
  // Filtrar productos según la búsqueda
  const productosFiltrados = busqueda
    ? productos.filter((producto) =>
        producto.name.toLowerCase().includes(busqueda.toLowerCase())
      )
    : productos;


  return (
    <div className="min-h-[70vh] mx-6 pt-20">
      <div className="max-w-7xl mx-auto">
        <h1
          onClick={() => navigate("/shop")}
          className="text-2xl text-slate-500 my-6 flex items-center gap-2 cursor-pointer"
        >
          {busqueda && <MoveLeft size={20} />} Todos los{" "}
          <span className="text-slate-700 font-medium">Productos</span>
        </h1>

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto mb-32">
          {productosFiltrados.map((producto) => (
            <ProductCard key={producto.id} product={producto} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Tienda() {
  return (
    <Suspense fallback={<div>Cargando tienda...</div>}>
      <ContenidoTienda />
    </Suspense>
  );
}
