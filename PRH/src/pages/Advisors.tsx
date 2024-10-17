// src/pages/Asesores.tsx

import { useState } from 'react';
import { Container, Row, Col, Button, FormControl } from 'react-bootstrap';
import AdvisorTable from '../components/Tables/AdvisorTable';
import '../components/tables/Styles.css';

const Advisors = () => {
  // <------------ Estados para los filtros ------------>
  const [searchAsesorado, setSearchAsesorado] = useState('');
  const [searchMateria, setSearchMateria] = useState('');
  const [searchAsesor, setSearchAsesor] = useState('');

  // DATOS DUMMY
  const registros = [
    {
      asesorado: 'Edson Eduardo',
      matricula: '197215',
      carrera: 'LMAD',
      genero: 'Masculino',
    },
    {
      asesorado: 'Kevin Sanchez',
      matricula: '111121212',
      carrera: 'LMAD',
      genero: 'Masculino',
    },
  ];

  //  <------------ Filtrar registros en función de los filtros ------------>
  const filteredRegistros = registros.filter(
    (registro) =>
      registro.asesorado
        .toLowerCase()
        .includes(searchAsesorado.toLowerCase()) &&
      registro.carrera.toLowerCase().includes(searchMateria.toLowerCase()) &&
      registro.matricula.toLowerCase().includes(searchAsesor.toLowerCase())
  );

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Asesores</h1>
          <div className="d-flex justify-content-end mb-3">
            <Button
              className="button"
              onClick={() => console.log('Nuevo registro agregado')}>
              Registro Entrada y Salida
            </Button>
          </div>

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
            <Button className="me-2" onClick={() => console.log('Buscando...')}>
              Buscar
            </Button>
            <Button className="button">Agregar Asesor</Button>
          </div>

          <div className="table-container">
            <AdvisorTable DataSource={filteredRegistros} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Advisors;
