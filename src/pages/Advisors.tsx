// src/pages/Asesores.tsx
import '../App.css';
import { useState } from 'react';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { BsArrowDownUp, BsXCircleFill, BsPersonVcardFill, BsPersonBadgeFill, BsMortarboardFill, BsPersonAdd, BsSearch } from 'react-icons/bs';

import AdvisorTable from '../components/Tables/AdvisorTable';

const Advisors = () => {
  const [searchName] = useState('');
  const [searchStudentId] = useState('');
  const [searchCareer] = useState('');

  const [advisors, setAdvisorsData] = useState([
    {
      Name: 'Edson Eduardo',
      Enrollment: '197215',
      DegreeIdentity: 'LMAD',
      Gender: 'Masculino',
    },
    {
      Name: 'Kevin Sanchez',
      Enrollment: '121212',
      DegreeIdentity: 'LMAD',
      Gender: 'Masculino',
    },
    {
      Name: 'María López',
      Enrollment: '201234',
      DegreeIdentity: 'LMAD',
      Gender: 'Femenino',
    },
    {
      Name: 'Juan Pérez',
      Enrollment: '198765',
      DegreeIdentity: 'LSTI',
      Gender: 'Masculino',
    },
    {
      Name: 'Claudia Fernández',
      Enrollment: '202345',
      DegreeIdentity: 'LM',
      Gender: 'Femenino',
    },
    {
      Name: 'Luis Torres',
      Enrollment: '199876',
      DegreeIdentity: 'LF',
      Gender: 'Masculino',
    },
    {
      Name: 'Ana Martínez',
      Enrollment: '207654',
      DegreeIdentity: 'LM',
      Gender: 'Femenino',
    },
    {
      Name: 'Daniel Ramirez',
      Enrollment: '210987',
      DegreeIdentity: 'LSTI',
      Gender: 'Masculino',
    },
    {
      Name: 'Sofia González',
      Enrollment: '215432',
      DegreeIdentity: 'LA',
      Gender: 'Femenino',
    },
    {
      Name: 'Pedro Hernández',
      Enrollment: '205678',
      DegreeIdentity: 'LF',
      Gender: 'Masculino',
    },
    {
      Name: 'Laura Silva',
      Enrollment: '218765',
      DegreeIdentity: 'LM',
      Gender: 'Femenino',
    },
  ]);

  const filteredAdvisors = advisors.filter((advisor) => advisor.Name.toLowerCase().includes(searchName.toLowerCase()) && advisor.DegreeIdentity.toLowerCase().includes(searchStudentId.toLowerCase()) && advisor.Enrollment.toLowerCase().includes(searchCareer.toLowerCase()));

  return (
    <Container className="mt-4 bg-white" style={{ minHeight: '100vh' }}>
      <Row className="px-2 py-1">
        <Col xs={10} lg={8}>
          <h1 className="fs-3 fw-bold text-start">Asesores</h1>
        </Col>
        <Col xs={2} lg={4} className="d-flex justify-content-end">
          <Button className="button" onClick={() => console.log('Nuevo advisor agregado')}>
            <BsArrowDownUp className="fs-5 me-1"></BsArrowDownUp> Entrada y Salida
          </Button>
        </Col>
      </Row>
      <Row className="shadow-sm rounded p-2 my-2">
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

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon3">
              {' '}
              <BsMortarboardFill className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Carrera" aria-label="Carrera" value={searchCareer} aria-describedby="basic-addon3" />
          </InputGroup>
        </Col>
        <Col xs={12} lg={4} className="d-flex justify-content-end my-2">
          <Button className="button d-flex align-items-center justify-content-center me-1">
            <BsXCircleFill className="me-1 fs-5" />
            Limpiar
          </Button>
          <Button className="button d-flex align-items-center justify-content-center" onClick={() => console.log('Buscando...')}>
            <BsSearch className="me-1 fs-5" />
            Buscar
          </Button>
        </Col>
      </Row>
      <Row className="shadow-sm rounded overflow-hidden p-2 my-2">
        <Col xs={12} lg={12} className="d-flex justify-content-end my-2">
          <Button className="buttonGreen d-flex align-items-center justify-content-center" variant="success">
            <BsPersonAdd className="me-1 fs-5" /> Agregar
          </Button>
        </Col>
        <Col xs={12} lg={12}>
          <div className="table-container">
            <AdvisorTable DataSource={filteredAdvisors} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Advisors;
