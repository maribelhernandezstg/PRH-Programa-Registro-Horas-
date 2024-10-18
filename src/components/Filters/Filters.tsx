import { useState } from "react";
import "./Filters.css"; // Asegúrate de que la ruta sea correcta

export const Filters = () => {
  const [nombre, setNombre] = useState("");
  const [matricula, setMatricula] = useState("");
  const [carrera, setCarrera] = useState("");

  const handleSearch = () => {
    if (nombre || matricula || carrera) {
      console.log("Buscando:", { nombre, matricula, carrera });
      // Implementa la lógica para buscar en tu tabla
    } else {
      alert("Por favor, ingresa al menos un criterio de búsqueda.");
    }
  };

  const handleAdd = () => {
    console.log("Agregar nuevo elemento");
    // Implementa la lógica para agregar un nuevo elemento
  };

  return (
    <div className="filters-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="input rectangle1"
        />
        <input
          type="text"
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          className="input rectangle2"
        />
        <input
          type="text"
          placeholder="Carrera"
          value={carrera}
          onChange={(e) => setCarrera(e.target.value)}
          className="input rectangle3"
        />
      </div>
      <div className="button-container">
        <button
          className="icon-button"
          onClick={handleAdd}
          aria-label="Agregar nuevo elemento"
        >
          <img
            src="/path/to/plus-icon.png"
            alt="Agregar"
            className="icon plus"
          />
        </button>
        <button
          className="icon-button"
          onClick={handleSearch}
          aria-label="Buscar"
        >
          <img
            src="/path/to/search-icon.png"
            alt="Buscar"
            className="icon search"
          />
        </button>
      </div>
    </div>
  );
};
