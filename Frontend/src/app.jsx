import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Productos from "./components/Productos.jsx";
import Carrito from "./components/Carrito.jsx";
import Login from "./components/Login.jsx";
import Registro from "./components/Registro.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/mujer" element={<Productos />} />
        <Route path="/hombre" element={<Productos />} />
        <Route path="/ninos" element={<Productos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/" element={<Productos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </>
  );
}

export default App;
