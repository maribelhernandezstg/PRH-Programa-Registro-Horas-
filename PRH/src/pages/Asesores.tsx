import { useState } from "react";
import { Container, Row, Col, Table, Button, FormControl } from "react-bootstrap";
import { FaSearch, FaPlus } from "react-icons/fa"; // Importar los íconos
import '../components/tables/Styles.css';

const Asesores = () => {
  const [searchAsesorado, setSearchAsesorado] = useState("");
  const [searchMateria, setSearchMateria] = useState("");
  const [searchAsesor, setSearchAsesor] = useState("");

  const handleAddRecord = () => {
    console.log("Nuevo registro agregado");
  };

  const registros = [
    { asesorado: "Edson Eduardo", matricula: "197215", carrera: "LMAD", genero: "Masculino" },
    { asesorado: "Kevin Sanchez", matricula: "111121212", carrera: "LMAD", genero: "Masculino" },
  ];

  const filteredRegistros = registros.filter(registro =>
    registro.asesorado.toLowerCase().includes(searchAsesorado.toLowerCase()) &&
    registro.carrera.toLowerCase().includes(searchMateria.toLowerCase()) &&
    registro.matricula.toLowerCase().includes(searchAsesor.toLowerCase())
  );

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Bienvenido a Asesores</h1>
          
          {/* Botón para registro de entrada y salida */}
          <div className="d-flex justify-content-end mb-3">
            <Button className="button" onClick={handleAddRecord}>
              Registro Entrada y Salida
            </Button>
          </div>

          {/* Filtros */}
          <div className="d-flex justify-content-between mb-3">
            <FormControl
              type="text"
              placeholder="Asesorado"
              className="me-2"
              value={searchAsesorado}
              onChange={(e) => setSearchAsesorado(e.target.value)}
            />
            <FormControl
              type="text"
              placeholder="Materia"
              className="me-2"
              value={searchMateria}
              onChange={(e) => setSearchMateria(e.target.value)}
            />
            <FormControl
              type="text"
              placeholder="Asesor"
              className="me-2"
              value={searchAsesor}
              onChange={(e) => setSearchAsesor(e.target.value)}
            />

            {/* Botón de búsqueda con icono de lupa */}
            <Button className="me-2">
              <FaSearch /> Buscar
            </Button>

            {/* Botón de agregar con icono de + */}
            <Button className="button" onClick={handleAddRecord}>
              <FaPlus /> Agregar Asesor
            </Button>
          </div>

          {/* Contenedor de la tabla */}
          <div className="table-container">
            <Table striped bordered hover className="mt-4 rounded-table">
              <thead>
                <tr>
                  <th>Asesorado</th>
                  <th>Matrícula</th>
                  <th>Carrera</th>
                  <th>Género</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistros.length > 0 ? (
                  filteredRegistros.map((registro, index) => (
                    <tr key={index}>
                      <td>{registro.asesorado}</td>
                      <td>{registro.matricula}</td>
                      <td>{registro.carrera}</td>
                      <td>{registro.genero}</td>
                      <td>
                        <Button className="button">Editar</Button>{" "}
                        <Button className="buttonRed">Borrar</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No se encontraron registros
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Asesores;
