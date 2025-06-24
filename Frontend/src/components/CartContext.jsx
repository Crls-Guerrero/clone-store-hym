import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (error) {
      console.error("Error al cargar el carrito desde localStorage:", error);
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage:", error);
    }
  }, [cart]);

  // Añadir al carrito (aumenta cantidad si ya existe)
  const addToCart = useCallback((producto) => {
    setCart((prevCart) => {
      const existe = prevCart.find((p) => p.idProducto === producto.idProducto);
      if (existe) {
        return prevCart.map((p) =>
          p.idProducto === producto.idProducto
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      } else {
        return [...prevCart, { ...producto, cantidad: 1 }];
      }
    });
  }, []);

  // Eliminar del carrito
  const removeFromCart = useCallback((idProducto) => {
    setCart((prevCart) => prevCart.filter((p) => p.idProducto !== idProducto));
  }, []);

  // Actualizar cantidad
  const updateQuantity = useCallback((idProducto, cantidad) => {
    if (cantidad < 1) return; // Evitar cantidades menores a 1
    setCart((prevCart) =>
      prevCart.map((p) =>
        p.idProducto === idProducto ? { ...p, cantidad } : p
      )
    );
  }, []);

  // Cantidad total de productos en el carrito
  const cartCount = cart.reduce((acc, p) => acc + p.cantidad, 0);

  // Total a pagar
  const cartTotal = cart.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  // Limpiar el carrito
  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem("cart");
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
