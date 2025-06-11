import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    passwordHash: "",
  });
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setExito("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");
    // Validación de todos los campos
    if (
      !form.nombre ||
      !form.apellido ||
      !form.telefono ||
      !form.email ||
      !form.passwordHash
    ) {
      setError("Completa todos los campos.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = await response.text();
        setError(data || "No se pudo registrar el usuario.");
        return;
      }
      setExito("¡Registro exitoso! Ahora puedes iniciar sesión.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Error de conexión. Intenta nuevamente.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="mt-20 w-full max-w-md bg-white border rounded-lg shadow p-8"
      >
        <div className="mb-6">
          <label className="block mb-2 font-semibold" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-semibold" htmlFor="apellido">
            Apellido
          </label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={form.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-semibold" htmlFor="telefono">
            Teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={form.telefono}
            onChange={handleChange}
            required
          />
        </div>
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
          <label className="block mb-2 font-semibold" htmlFor="passwordHash">
            Contraseña
          </label>
          <input
            id="passwordHash"
            name="passwordHash"
            type="password"
            autoComplete="new-password"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={form.passwordHash}
            onChange={handleChange}
            required
          />
        </div>
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}
        {exito && (
          <div className="mb-4 text-green-600 font-semibold text-center">
            {exito}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded font-bold hover:bg-gray-800 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Registro;
