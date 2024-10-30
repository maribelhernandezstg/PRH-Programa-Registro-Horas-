/* Matricula, Nombre, Tipo, Estado:Activo/Desactivado */

// src/pages/Asesores.tsx
import '../App.css';
import { useState } from 'react';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { BsPersonVcardFill, BsPersonBadgeFill, BsPersonAdd, BsSearch } from 'react-icons/bs';

import RegisterTable from '../components/Tables/RegisterTable';
import '../components/tables/Styles.css';

const Advisors = () => {
  // <------------ Estados para los filtros ------------>
  const [searchName] = useState('');
  const [searchStudentId] = useState('');
  const [searchCareer] = useState('');

  // DATOS DUMMY
  const registrosUsuarios = [
    {
      Name: 'Edson Eduardo',
      Enrollment: '197215',
      Active: true,
    },
    {
      Name: 'Kevin Sanchez',
      Enrollment: '121212',
      Active: true,
    },
    {
      Name: 'María López',
      Enrollment: '201234',
      Active: true,
    },
    {
      Name: 'Juan Pérez',
      Enrollment: '198765',
      Active: true,
    },
    {
      Name: 'Claudia Fernández',
      Enrollment: '202345',
      Active: false,
    },
    {
      Name: 'Luis Torres',
      Enrollment: '199876',
      Active: true,
    },
    {
      Name: 'Ana Martínez',
      Enrollment: '207654',
      Active: false,
    },
    {
      Name: 'Daniel Ramirez',
      Enrollment: '210987',
      Active: false,
    },
    {
      Name: 'Sofia González',
      Enrollment: '215432',
      Active: true,
    },
    {
      Name: 'Pedro Hernández',
      Enrollment: '205678',
      Active: true,
    },
    {
      Name: 'Laura Silva',
      Enrollment: '218765',
      Active: false,
    },
  ];

  //  <------------ Filtrar registros en función de los filtros ------------>

  const filteredRegistros = registrosUsuarios.filter((registro) => registro.Name.toLowerCase().includes(searchName.toLowerCase()) && registro.Enrollment.toLowerCase().includes(searchCareer.toLowerCase()));

  return (
    <Container className="mt-3">
      <Row>
        <Col xs={10} lg={8}>
          <h1 className="fs-3 fw-bold text-start">Usuarios</h1>
        </Col>
        <Col xs={12} lg={8} className="d-flex my-2">
          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon1">
              {' '}
              <BsPersonBadgeFill className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Nombre(s)" aria-label="Nombre(s)" value={searchName} aria-describedby="basic-addon1" />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon2">
              {' '}
              <BsPersonVcardFill className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Matrícula" aria-label="Matrícula" value={searchStudentId} aria-describedby="basic-addon2" />
          </InputGroup>
        </Col>
        <Col xs={12} lg={4} className="d-flex justify-content-end my-2">
          <Button className="button -flex align-items-center justify-content-center me-3" onClick={() => console.log('Buscando...')}>
            <BsSearch className="me-1 fs-5" />
            Buscar
          </Button>
          <Button className="button d-flex align-items-center justify-content-center" variant="success">
            <BsPersonAdd className="me-1 fs-5" /> Agregar
          </Button>
        </Col>

        <Col xs={12} lg={12}>
          <div className="table-container">
            <RegisterTable DataSource={filteredRegistros} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Advisors;
