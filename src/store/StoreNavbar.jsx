import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";

const StoreNavbar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-between px-8 py-4 bg-linear-to-r from-blue-900 via-blue-800 to-blue-950 text-white shadow-md">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <img
          src={logo}
          alt="Moto Parts J&J"
          className="h-10 transition-transform duration-300 hover:scale-105"
        />
        <span className="hidden md:block font-semibold text-lg tracking-wide">
          Moto Parts J&J
        </span>
      </Link>

      {/* Usuario */}
      <div className="flex items-center gap-6">

        {user && (
          <p className="text-sm md:text-base">
            👤 {user.email}
          </p>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
        >
          Cerrar sesión
        </button>

      </div>
    </div>
  );
};

export default StoreNavbar;