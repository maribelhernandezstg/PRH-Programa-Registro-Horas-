import '../App.css';
import { useState } from 'react';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { BsArrowDownUp, BsXCircleFill, BsPersonVcardFill, BsPersonBadgeFill, BsMortarboardFill, BsPersonAdd, BsSearch } from 'react-icons/bs';

import AdvisorTable from '../components/Tables/AdvisorTable';

const Advisors = () => {
  const [searchName, setSearchName] = useState('');
  const [searchStudentId, setSearchStudentId] = useState('');
  const [searchCareer, setSearchCareer] = useState('');

  const [advisors, setAdvisorsData] = useState([
    {
      Name: 'Edson Eduardo Martínez González',
      Enrollment: '197215',
      DegreeIdentity: 'LMAD',
      Gender: 'Masculino',
    },
    {
      Name: 'Kevin Alejandro Sánchez Rodríguez',
      Enrollment: '121212',
      DegreeIdentity: 'LMAD',
      Gender: 'Masculino',
    },
    {
      Name: 'María Fernanda López Ramírez',
      Enrollment: '201234',
      DegreeIdentity: 'LMAD',
      Gender: 'Femenino',
    },
    {
      Name: 'Juan Carlos Pérez Hernández',
      Enrollment: '198765',
      DegreeIdentity: 'LSTI',
      Gender: 'Masculino',
    },
    {
      Name: 'Claudia Alejandra Fernández Martínez',
      Enrollment: '202345',
      DegreeIdentity: 'LM',
      Gender: 'Femenino',
    },
    {
      Name: 'Luis Alberto Torres Gutiérrez',
      Enrollment: '199876',
      DegreeIdentity: 'LF',
      Gender: 'Masculino',
    },
    {
      Name: 'Ana Sofía Martínez López',
      Enrollment: '207654',
      DegreeIdentity: 'LM',
      Gender: 'Femenino',
    },
    {
      Name: 'Daniel Antonio Ramírez Sánchez',
      Enrollment: '210987',
      DegreeIdentity: 'LSTI',
      Gender: 'Masculino',
    },
    {
      Name: 'Sofia Guadalupe González Morales',
      Enrollment: '215432',
      DegreeIdentity: 'LA',
      Gender: 'Femenino',
    },
    {
      Name: 'Pedro Luis Hernández Navarro',
      Enrollment: '205678',
      DegreeIdentity: 'LF',
      Gender: 'Masculino',
    },
    {
      Name: 'Laura Beatriz Silva Fernández',
      Enrollment: '218765',
      DegreeIdentity: 'LM',
      Gender: 'Femenino',
    },
  ]);

  const filteredAdvisors = advisors.filter((advisor) => {
    const regexName = new RegExp(searchName, 'i');
    const regexStudentId = new RegExp(searchStudentId, 'i');
    const regexCareer = new RegExp(searchCareer, 'i');

    return (
      (!searchName || regexName.test(advisor.Name)) &&
      (!searchStudentId || regexStudentId.test(advisor.Enrollment)) &&
      (!searchCareer || regexCareer.test(advisor.DegreeIdentity))
    );
  });

  return (
    <Container className="mt-4 bg-white" style={{ minHeight: '100vh' }}>
      <Row className="px-2 py-1">
        <Col xs={10} lg={8}>
          <h1 className="fs-3 fw-bold text-start">Asesores</h1>
        </Col>
        <Col xs={2} lg={4} className="d-flex justify-content-end">
          <Button className="button" onClick={() => console.log('Nuevo advisor agregado')}>
            <BsArrowDownUp className="fs-5 me-1" /> Entrada y Salida
          </Button>
        </Col>
      </Row>
      <Row className="shadow-sm rounded p-2 my-2">
        <Col xs={12} lg={8} className="d-flex my-2">
          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon1">
              <BsPersonBadgeFill className="fs-5" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Nombre(s)"
              aria-label="Nombre(s)"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon2">
              <BsPersonVcardFill className="fs-5" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Matrícula"
              aria-label="Matrícula"
              value={searchStudentId}
              onChange={(e) => setSearchStudentId(e.target.value)}
              aria-describedby="basic-addon2"
            />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon3">
              <BsMortarboardFill className="fs-5" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Carrera"
              aria-label="Carrera"
              value={searchCareer}
              onChange={(e) => setSearchCareer(e.target.value)}
              aria-describedby="basic-addon3"
            />
          </InputGroup>
        </Col>
        <Col xs={12} lg={4} className="d-flex justify-content-end my-2">
          <Button className="button d-flex align-items-center justify-content-center me-1" onClick={() => { setSearchName(''); setSearchStudentId(''); setSearchCareer(''); }}>
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
          <Container>
            <AdvisorTable DataSource={filteredAdvisors} />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Advisors;
