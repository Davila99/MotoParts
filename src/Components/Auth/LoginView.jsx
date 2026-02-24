const LoginView = ({ email, password, onEmailChange, onPasswordChange, onSubmit, loading }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 px-4">
      <div className="w-full max-w-sm bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-blue-200">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">Moto Parts J&J</h2>
        <p className="text-center text-slate-600 mb-6 text-sm">Accede a tu cuenta para continuar</p>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electronico"
            className="border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 transition"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contrasena"
            className="border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 transition"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
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

export default LoginView;
