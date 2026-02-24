import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../../hooks/useCart";

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { total: cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { text: "Inicio", path: "/" },
    { text: "Comercio", path: "/shop" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/shop?search=${search}`);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-linear-to-r from-blue-950 via-blue-900 to-blue-800 shadow-xl z-50 border-b border-blue-700">

  <div className="mx-4 sm:mx-6">
    <div className="flex items-center justify-between max-w-7xl mx-auto py-4">

      {/* Logo + Botón móvil */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 text-white hover:text-red-500 transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          onClick={() => {
            navigate("/");
            closeMobileMenu();
          }}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <img
            src={logo}
            alt="MotoParts Logo"
            className="h-10 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-white font-bold text-lg hidden sm:block">
            Moto<span className="text-red-500">Parts</span>
          </span>
        </div>
      </div>

      {/* MENÚ DESKTOP */}
      <div className="hidden lg:flex items-center gap-8 text-white">

        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="relative font-medium hover:text-red-500 transition-colors"
          >
            {link.text}
          </Link>
        ))}

        {/* Botón Admin */}
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 transition font-semibold shadow-md"
        >
          Admin
        </button>

        {/* Buscador */}
        <form
          onSubmit={handleSearch}
          className="flex items-center w-56 text-sm gap-2 bg-white px-4 py-2 rounded-full shadow-inner"
        >
          <Search size={18} className="text-slate-600 shrink-0" />
          <input
            className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400"
            type="text"
            placeholder="Buscar productos"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
        </form>

        {/* Carrito */}
        <Link
          to="/cart"
          className="relative flex items-center gap-2 hover:text-red-500 transition"
        >
          <ShoppingCart size={20} />
          <span>Carrito</span>
          <span className="absolute -top-2 -right-3 text-xs text-white bg-red-600 px-1.5 py-0.5 rounded-full">
            {cartCount}
          </span>
        </Link>

      </div>

      {/* ICONO CARRITO MOVIL */}
      <div className="flex lg:hidden items-center gap-4 text-white">
        <Link
          to="/cart"
          className="relative hover:text-red-500 transition"
          onClick={closeMobileMenu}
        >
          <ShoppingCart size={22} />
          <span className="absolute -top-2 -right-2 text-[10px] text-white bg-red-600 px-1 rounded-full">
            {cartCount}
          </span>
        </Link>
      </div>

    </div>
  </div>
</nav>
  );
};

export default Navbar;
