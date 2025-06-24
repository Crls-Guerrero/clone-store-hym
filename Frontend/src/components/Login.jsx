import { useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.email && form.password) {
      try {
        // Enviar email y passwordHash (aquí password como passwordHash)
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            passwordHash: form.password, // El backend espera passwordHash
          }),
        });

        if (!response.ok) {
          const data = await response.text();
          setError(data || "Credenciales incorrectas.");
          return;
        }

        const userData = await response.json();
        console.log("userData recibido del backend:", userData);
        login(userData);
        navigate("/");
      } catch (err) {
        setError("Error de conexión. Intenta nuevamente.");
        console(err);
      }
    } else {
      setError("Completa todos los campos.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="mt-20 w-full max-w-md bg-white border rounded-lg shadow p-8"
      >
        <div className="mb-6">
          <label className="block mb-2 font-semibold" htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-semibold" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded font-bold hover:bg-gray-800 transition"
        >
          Iniciar sesión
        </button>
      </form>
      <div className="text-center mt-4">
        ¿No tienes cuenta?{" "}
        <Link to="/registro" className="text-blue-600 underline">
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
}

export default Login;
