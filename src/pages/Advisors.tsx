// src/pages/Asesores.tsx
import '../App.css';
import { useState } from 'react';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import {
  BsFillFilePersonFill,
  BsBook,
  BsPersonWorkspace,
  BsPersonAdd,
  BsSearch,
} from 'react-icons/bs';

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
    <Container className="mt-3">
      <Row>
        <h1 className="fs-3 fw-bold text-center">Asesores</h1>
        <Col>
          <div className="mt-2">
            <div className="d-flex justify-content-end">
              <Button
                className="button"
                onClick={() => console.log('Nuevo registro agregado')}>
                Registro Entrada y Salida
              </Button>
            </div>
          </div>
          <div className="m-2 d-flex align-items-center justify-content-center">
            <div className="d-flex w-100">
              <div className="d-flex w-75">
                <InputGroup className="w-75 me-3">
                  <InputGroup.Text id="basic-addon1">
                    {' '}
                    <BsFillFilePersonFill className="fs-5" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Asesorado"
                    aria-label="Asesorado"
                    value={searchAsesorado}
                    aria-describedby="basic-addon1"
                    onChange={(e) => setSearchAsesorado(e.target.value)}
                  />
                </InputGroup>

                <InputGroup className="w-75 me-3">
                  <InputGroup.Text id="basic-addon2">
                    {' '}
                    <BsBook className="fs-5" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Materia"
                    aria-label="Materia"
                    value={searchMateria}
                    aria-describedby="basic-addon2"
                    onChange={(e) => setSearchMateria(e.target.value)}
                  />
                </InputGroup>

                <InputGroup className="w-75 me-3">
                  <InputGroup.Text id="basic-addon3">
                    {' '}
                    <BsPersonWorkspace className="fs-5" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Asesor"
                    aria-label="Asesor"
                    value={searchAsesor}
                    aria-describedby="basic-addon3"
                    onChange={(e) => setSearchAsesor(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="d-flex w-25 justify-content-end">
                <Button
                  className="button me-3"
                  onClick={() => console.log('Buscando...')}>
                  <BsSearch />
                  Buscar
                </Button>
                <Button className="button" variant="success">
                  <BsPersonAdd /> Asesor
                </Button>
              </div>
            </div>
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
