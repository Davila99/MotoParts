import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  // Credenciales de ejemplo
  const correctUsername = "admin2026@@";
  const correctPassword = "1234";

  const [username, setUsername] = useState(correctUsername);
  const [password, setPassword] = useState(correctPassword);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === correctUsername && password === correctPassword) {
      toast.success("¡Inicio de sesión correcto!");
      navigate("/store");
    } else {
      toast.error("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            className="border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 transition"

            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            className="border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-slate-800 text-white py-2.5 rounded-lg hover:bg-slate-900 active:scale-95 transition-all font-medium"
          >
            Acceder
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
