import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext.jsx";
import { useLocation } from "react-router-dom";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addToCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:8080/productos")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  // Filtrar por idGenero según la ruta
  const generos = {
    "/mujer": 1,
    "/hombre": 2,
    "/ninos": 3,
  };

  const generoId = generos[location.pathname];

  const productosFiltrados = generoId
    ? productos.filter((p) => p.genero && p.genero.idGenero === generoId)
    : productos;

  if (loading) {
    return <div className="text-center py-10">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-center py-10">Error al cargar productos.</div>;
  }

  if (productosFiltrados.length === 0) {
    return (
      <div className="text-center py-10">
        No hay productos en esta categoría.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 font-sans grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productosFiltrados.map((producto) => (
        <div
          key={producto.idProducto}
          className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 p-4 flex flex-col items-center min-h-[320px] border border-gray-200"
        >
          <img
            src={`http://localhost:8080${producto.imgProducto}`}
            alt={producto.nombre}
            className="w-32 h-32 object-cover mb-4 rounded-lg shadow-md"
          />
          <h3
            className="font-semibold text-base mb-2 text-center line-clamp-2"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "40px",
            }}
            title={producto.nombre}
          >
            {producto.nombre}
          </h3>
          <span className="text-gray-700 mb-2 font-medium">
            ${producto.precio}
          </span>
          <button
            onClick={() => addToCart(producto)}
            className="mt-auto w-full bg-black text-white px-4 py-3 rounded-md  transition-all duration-300 flex items-center justify-center space-x-2 border border-black  group"
          >
            {/* Icono del carrito con efecto hover */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover:rotate-[-10deg] transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>

            {/* Texto con efecto de movimiento */}
            <span className="relative overflow-hidden block">
              <span className="block group-hover:translate-y-[-100%] transition-transform duration-300">
                Añadir al carrito
              </span>
              <span className="absolute top-full left-0 w-full text-center block group-hover:translate-y-[-100%] transition-transform duration-300">
                Añadir al carrito
              </span>
            </span>
          </button>
        </div>
      ))}
    </section>
  );
}

export default Productos;
