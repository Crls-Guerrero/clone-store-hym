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
  console.log("Ruta:", location.pathname, "GeneroId:", generoId);

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
          className="bg-white rounded shadow p-4 flex flex-col items-center min-h-[320px]" // altura mínima para uniformidad
        >
          <img
            src={`http://localhost:8080${producto.imgProducto}`}
            alt={producto.nombre}
            className="w-32 h-32 object-cover mb-4"
          />
          <h3
            className="font-semibold text-base mb-2 text-center line-clamp-2"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "40px", // un poco más de espacio para 2 líneas
            }}
            title={producto.nombre}
          >
            {producto.nombre}
          </h3>
          <span className="text-gray-700 mb-2">${producto.precio}</span>
          <button
            className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition"
            onClick={() => addToCart(producto)}
          >
            Añadir al carrito
          </button>
        </div>
      ))}
    </section>
  );
}

export default Productos;
