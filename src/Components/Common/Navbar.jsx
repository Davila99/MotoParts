import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/logo.png";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const cartCount = useSelector((state) => state.cart.total);
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
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="mx-4 sm:mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">
          {/* Logo + Botón móvil */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-slate-600 hover:text-indigo-500 transition-colors"
              aria-label="Abrir menú"
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
                alt="Logo TecnoMarket GT"
                className="h-11 sm:h-10 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* MENÚ DESKTOP */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-slate-600">

            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="hover:text-indigo-500 transition-colors font-medium"
              >
                {link.text}
              </Link>
            ))}

            {/* Botón Admin estilo input redondeado */}
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-full border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all font-medium cursor-pointer"
            >
              Admin
            </button>

            {/* Buscador */}
            <form
              onSubmit={handleSearch}
              className="flex items-center w-48 xl:w-64 text-sm gap-2 bg-slate-100 px-4 py-2 xl:py-3 rounded-full"
            >
              <Search size={18} className="text-slate-600 flex-shrink-0" />
              <input
                className="w-full bg-transparent outline-none placeholder-slate-600"
                type="text"
                placeholder="Buscar Productos"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </form>

            {/* Carrito */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 text-slate-600"
            >
              <ShoppingCart size={18} /> Cart
              <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">
                {cartCount}
              </button>
            </Link>
          </div>

          {/* ICONOS MOVIL */}
          <div className="flex lg:hidden items-center gap-3 sm:gap-4">
            <Link
              to="/cart"
              className="relative p-2 text-slate-600 hover:text-indigo-500 transition-colors"
              onClick={closeMobileMenu}
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 text-[10px] text-white bg-slate-600 size-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* MENU MOVIL */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div
            onClick={() => {
              navigate("/");
              closeMobileMenu();
            }}
            className="cursor-pointer"
          >
            <img src={logo} alt="Logo TecnoMarket GT" className="h-8" />
          </div>

          <button
            onClick={closeMobileMenu}
            className="p-2 text-slate-600 hover:text-indigo-500 transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-2 sm:space-y-4">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="block py-3 sm:py-4 text-lg sm:text-xl text-slate-600 hover:text-indigo-500 transition-colors border-b border-gray-100 font-medium"
              onClick={closeMobileMenu}
            >
              {link.text}
            </Link>
          ))}

          {/* Botón Admin móvil */}
          <button
            onClick={() => {
              navigate("/login");
              closeMobileMenu();
            }}
            className="w-full py-2 px-4 rounded-full border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all font-medium mt-4"
          >
            Admin
          </button>
        </div>
      </div>

      {/* FONDO OSCURO */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;
