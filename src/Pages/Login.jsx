import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../services/supabase";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("¡Inicio de sesión correcto!");
      navigate("/store");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 px-4">

      <div className="w-full max-w-sm bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-blue-200">

        <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">
          Moto Parts J&J
        </h2>

        <p className="text-center text-slate-600 mb-6 text-sm">
          Accede a tu cuenta para continuar
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Correo electrónico"
            className="border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 active:scale-95 transition-all font-semibold shadow-md"
          >
            {loading ? "Ingresando..." : "Acceder"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;