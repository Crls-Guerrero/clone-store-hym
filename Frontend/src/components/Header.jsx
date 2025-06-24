import { Link } from "react-router-dom";
import { useCart } from "./CartContext.jsx";
import { useAuth } from "./AuthContext.jsx";

function Header() {
  const { cartCount, clearCart } = useCart();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    clearCart();
  };

  return (
    <header className="w-full bg-white border-b shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo y menú */}
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2">
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 7h20M4 14h20M4 21h20" />
            </svg>
          </button>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg"
            alt="H&M Logo"
            className="h-8 w-auto"
          />
        </div>

        {/* Navegación */}
        <nav className="hidden md:flex flex-1 justify-center gap-10 font-sans">
          <Link
            to="/hombre"
            className="font-bold text-black hover:text-gray-800 transition-colors duration-200"
          >
            HOMBRE
          </Link>
          <Link
            to="/mujer"
            className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
          >
            MUJER
          </Link>
          <Link
            to="/ninos"
            className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
          >
            NIÑOS
          </Link>
          <Link
            to="/"
            className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
          >
            HOME
          </Link>
        </nav>

        {/* Iconos usuario y carrito */}
        <div className="flex items-center gap-4">
          {!user ? (
            // Si NO está logeado, muestra el icono de login
            <Link to="/login" className="relative p-2" title="Iniciar sesión">
              <button className="p-2 cursor-pointer">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
                </svg>
              </button>
            </Link>
          ) : (
            // Si está logeado, muestra el nombre y botón de cerrar sesión
            <div className="flex items-center gap-2">
              <span className="font-semibold text-black" title={user.email}>
                {user.nombre || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="p-2 cursor-pointer"
                title="Cerrar sesión"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="red"
                  strokeWidth="2"
                >
                  <path d="M6 18L18 6M6 6l12 12" /> {/* Icono de X */}
                </svg>
              </button>
            </div>
          )}
          {/* Carrito */}
          <Link to="/carrito" className="relative p-2">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
