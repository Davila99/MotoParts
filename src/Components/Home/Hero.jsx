import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center px-4 md:px-16 lg:px-24">
      <svg
        className="absolute inset-0 -z-10 size-full max-md:hidden"
        width="1440"
        height="720"
        viewBox="0 0 1440 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke="var(--color-gray-200)" strokeOpacity=".5" d="M-15.227 702.342H1439.7" />
        <circle cx="711.819" cy="372.562" r="308.334" stroke="var(--color-gray-200)" strokeOpacity=".5" />
        <circle cx="16.942" cy="20.834" r="308.334" stroke="var(--color-gray-200)" strokeOpacity=".5" />
        <path stroke="var(--color-gray-200)" strokeOpacity=".5" d="M-15.227 573.66H1439.7M-15.227 164.029H1439.7" />
        <circle cx="782.595" cy="411.166" r="308.334" stroke="var(--color-gray-200)" strokeOpacity=".5" />
      </svg>

      <h1 className="mt-4 max-w-3xl scale-105 bg-gradient-to-r from-black to-[#748298] bg-clip-text text-center text-4xl/12 font-bold text-transparent md:scale-100 md:text-6xl/20">
        La mejor tecnología al mejor precio, al alcance de un clic.
      </h1>

      <p className="mt-2 max-w-xl text-center text-base/7 text-gray-700">
        Descubre teléfonos, cámaras, audífonos y gadgets con ofertas exclusivas para ti. Compra fácil, rápido y seguro.
      </p>

      <Link
        to="/shop"
        className="mt-8 flex items-center gap-2 rounded-full bg-gray-900 px-8 py-2.5 font-medium text-white transition hover:opacity-90"
      >
        <span>Comprar ahora</span>
        <ArrowRightIcon className="size-5" />
      </Link>
    </section>
  );
}
