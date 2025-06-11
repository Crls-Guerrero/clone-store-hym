import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Añadir al carrito (aumenta cantidad si ya existe)
  const addToCart = (producto) => {
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
  };

  // Eliminar del carrito
  const removeFromCart = (idProducto) => {
    setCart((prevCart) => prevCart.filter((p) => p.idProducto !== idProducto));
  };

  // Actualizar cantidad
  const updateQuantity = (idProducto, cantidad) => {
    setCart((prevCart) =>
      prevCart.map((p) =>
        p.idProducto === idProducto ? { ...p, cantidad } : p
      )
    );
  };

  // Cantidad total de productos en el carrito
  const cartCount = cart.reduce((acc, p) => acc + p.cantidad, 0);

  // Total a pagar
  const cartTotal = cart.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  // Limpiar el carrito
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

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
