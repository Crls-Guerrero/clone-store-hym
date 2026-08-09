import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.idCliente}>
            {cliente.nombre} - {cliente.apellido} - {cliente.email}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
