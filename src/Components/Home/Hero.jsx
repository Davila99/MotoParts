import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-900 via-blue-800 to-blue-950 px-6 text-white">

      {/* Logo */}
      <img
        src={logo}
        alt="Moto Parts J&J"
        className="w-40 md:w-52 mb-6 drop-shadow-2xl"
      />

      {/* Título */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-center max-w-4xl leading-tight">
        Repuestos y accesorios para tu moto
        <span className="block text-red-500 mt-2">
          Calidad, potencia y confianza
        </span>
      </h1>

      {/* Descripción */}
      <p className="mt-6 text-center max-w-2xl text-lg text-blue-100">
        En Moto Parts J&J encuentras cascos, luces, baterías, frenos,
        lubricantes y todo lo que tu moto necesita para rendir al máximo.
      </p>

      {/* Botón */}
      <Link
        to="/shop"
        className="mt-10 flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-xl hover:scale-105"
      >
        Ver Productos
        <ArrowRightIcon className="size-5" />
      </Link>

      {/* Contacto */}
      <div className="mt-10 text-sm text-blue-200 text-center">
        <p>📞 Claro: 8203-0726</p>
        <p>📞 Tigo: 8183-6031</p>
      </div>
    </section>
  );
}