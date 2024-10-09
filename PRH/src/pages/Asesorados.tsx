import { Container, Row, Col } from "react-bootstrap";
import "../App.css";
import { Filters } from "../components/Filters/Filters";
import AsesoresTable from "../components/tables/TableAsesores"; 
import { useState } from "react";

const Asesorados = () => {
  
  const [searchAsesorado, setSearchAsesorado] = useState("");
  const [searchMateria, setSearchMateria] = useState("");
  const [searchAsesor, setSearchAsesor] = useState("");

  
  const registrosAsesorados = [
    { asesorado: "Maria Lopez", matricula: "202321", carrera: "LDS", genero: "Femenino" },
    { asesorado: "Carlos Perez", matricula: "202456", carrera: "ITC", genero: "Masculino" },
  ];

  
  const filteredRegistros = registrosAsesorados.filter(registro =>
    registro.asesorado.toLowerCase().includes(searchAsesorado.toLowerCase()) &&
    registro.carrera.toLowerCase().includes(searchMateria.toLowerCase()) &&
    registro.matricula.toLowerCase().includes(searchAsesor.toLowerCase())
  );

  return (
    <Container className="window-container">
      <Row>
        <p className="title-container">Asesorados</p>
        
        <Filters />
        {/* Tabla de Asesorados */}
        <Col>
          <div className="table-container">
            {/* Pasamos los registros filtrados a AsesoresTable */}
            <AsesoresTable registros={filteredRegistros} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Asesorados;
