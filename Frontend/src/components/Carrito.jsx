import { useCart } from "./CartContext.jsx";
import { useState } from "react";

function Carrito() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [metodoPago, setMetodoPago] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [enviarBoletaWhatsapp, setEnviarBoletaWhatsapp] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handlePago = () => {
    if (!aceptaTerminos) {
      setMensaje("Debes aceptar los Términos y Condiciones.");
      return;
    }
    if (!metodoPago) {
      setMensaje("Selecciona un método de pago.");
      return;
    }
    setMensaje("");
    if (enviarBoletaWhatsapp) {
      setMensaje("¡La boleta será enviada a tu WhatsApp registrado!");
    } else {
      setMensaje("¡Pago procesado correctamente!");
    }
  };

  if (cart.length === 0) {
    return <div className="text-center py-10">Tu carrito está vacío.</div>;
  }

  // Métodos de pago como array para mapear
  const metodos = [
    {
      id: "paypal",
      img: "https://www.paypalobjects.com/webstatic/icon/pp258.png",
      alt: "PayPal",
    },
    {
      id: "pagoefectivo",
      img: "https://avatars.githubusercontent.com/u/33136169?s=200&v=4",
      alt: "PagoEfectivo",
    },
    {
      id: "yape",
      img: "https://perupacific.com/wp-content/uploads/2020/04/ICONOS-yape-para-pagina-png.png",
      alt: "Yape",
    },
    {
      id: "plin",
      img: "https://logosenvector.com/logo/img/plin-interbank-4391.png",
      alt: "Plin",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto py-8 px-2">
      {/* Lista de productos */}
      <section
        className="flex-1 bg-white shadow p-6 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        style={{ border: "none", borderRadius: 0, scrollBehavior: "smooth" }}
      >
        <h2 className="text-2xl font-bold mb-6">Carrito de compras</h2>
        {cart.map((producto) => (
          <div
            key={producto.idProducto}
            className="flex items-center gap-4 mb-4 border-b pb-4"
          >
            <img
              src={`http://localhost:8080${producto.imgProducto}`}
              alt={producto.nombre}
              className="w-20 h-20 object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold truncate max-w-xs">
                  {producto.nombre}
                </h3>
                <span className="text-gray-700 ml-4 min-w-[80px] text-right">
                  S/. {producto.precio}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() =>
                    updateQuantity(producto.idProducto, producto.cantidad - 1)
                  }
                  className="px-2 border rounded"
                >
                  -
                </button>
                <span>{producto.cantidad}</span>
                <button
                  onClick={() =>
                    updateQuantity(producto.idProducto, producto.cantidad + 1)
                  }
                  className="px-2 border rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(producto.idProducto)}
                  className="ml-4"
                  title="Eliminar"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                    alt="Eliminar"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Resumen y métodos de pago */}
      <aside className="w-full md:w-[350px]">
        <div className="sticky top-8 bg-white shadow p-6">
          <div className="mb-4">
            <div className="text-gray-600">TOTAL:</div>
            <div className="text-2xl font-bold mb-2">
              S/. {cartTotal.toFixed(2)}
            </div>
          </div>
          <h3 className="font-semibold mb-2">Selecciona un método de pago:</h3>
          <div className="flex gap-4 mb-4">
            {metodos.map((metodo) => (
              <button
                key={metodo.id}
                type="button"
                onClick={() => setMetodoPago(metodo.id)}
                className={`p-1 rounded transition border-2 focus:outline-none ${
                  metodoPago === metodo.id
                    ? "border-black shadow-lg"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                style={{ background: "white" }}
                aria-label={metodo.alt}
              >
                <img
                  src={metodo.img}
                  alt={metodo.alt}
                  className="w-12 h-12 object-contain"
                />
              </button>
            ))}
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="aceptaTerminos"
              checked={aceptaTerminos}
              onChange={() => setAceptaTerminos(!aceptaTerminos)}
              className="mr-2"
            />
            <label htmlFor="aceptaTerminos" className="text-sm">
              Acepto los{" "}
              <a href="#" className="underline">
                Términos y Condiciones
              </a>{" "}
              .
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="enviarBoletaWhatsapp"
              checked={enviarBoletaWhatsapp}
              onChange={() => setEnviarBoletaWhatsapp(!enviarBoletaWhatsapp)}
              className="mr-2"
            />
            <label htmlFor="enviarBoletaWhatsapp" className="text-sm">
              Quiero recibir la boleta por WhatsApp
            </label>
          </div>
          <button
            onClick={handlePago}
            className="w-full bg-black text-white py-3 rounded font-bold text-lg hover:bg-gray-800 transition"
          >
            PROCEDER AL PAGO
          </button>
          {mensaje && (
            <div className="mt-4 text-center text-green-600 font-semibold">
              {mensaje}
            </div>
          )}

          <div className="text-xs text-gray-500 mt-4">
            Los precios y gastos de envío no están confirmados hasta que hayas
            llegado a completar la compra.
            <br />
            ¿Necesitas ayuda? Ponte en contacto con el{" "}
            <a href="#" className="underline">
              servicio de Atención al cliente
            </a>
            .
          </div>
        </div>
      </aside>
      {/* Estilos personalizados para el scroll */}
      <style>{`
        section::-webkit-scrollbar {
          width: 8px;
        }
        section::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 8px;
        }
        section {
          scrollbar-width: thin;
          scrollbar-color: #e5e7eb transparent;
        }
      `}</style>
    </div>
  );
}

export default Carrito;
