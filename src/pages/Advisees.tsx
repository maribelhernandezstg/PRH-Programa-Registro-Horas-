import '../App.css';
import { Container, Row, Button, InputGroup, Col, Form } from 'react-bootstrap';
import { useState } from 'react';
import { BsPersonVcardFill, BsPersonBadgeFill, BsMortarboardFill, BsXCircleFill, BsPersonAdd, BsSearch } from 'react-icons/bs';

import AdvisorTable from '../components/Tables/AdvisorTable';

const Advisees = () => {
  const [searchName, setSearchName] = useState('');
  const [searchStudentId, setSearchStudentId] = useState('');
  const [searchCareer, setSearchCareer] = useState('');

  const [advisees, setAdviseesData] = useState([
    {
      Name: 'Edson Eduardo Salazar Muñoz',
      Enrollment: '197215',
      DegreeIdentity: 'LMAD',
      Gender: 'Masculino',
    },
    {
      Name: 'Kevin Leonardo Sánchez Ortega',
      Enrollment: '121212',
      DegreeIdentity: 'LMAD',
      Gender: 'Masculino',
    },
    {
      Name: 'María Teresa López Castillo',
      Enrollment: '193456',
      DegreeIdentity: 'LSTI',
      Gender: 'Femenino',
    },
    {
      Name: 'Juan Manuel Pérez Torres',
      Enrollment: '189874',
      DegreeIdentity: 'LMAD',
      Gender: 'Masculino',
    },
    {
      Name: 'Carla Alejandra Mendoza Ruiz',
      Enrollment: '204567',
      DegreeIdentity: 'LCC',
      Gender: 'Femenino',
    },
    {
      Name: 'Luis Fernando Torres Medina',
      Enrollment: '176543',
      DegreeIdentity: 'LCC',
      Gender: 'Masculino',
    },
    {
      Name: 'Ana María González Díaz',
      Enrollment: '215678',
      DegreeIdentity: 'LF',
      Gender: 'Femenino',
    },
    {
      Name: 'Daniel Alejandro Ramírez Jiménez',
      Enrollment: '198765',
      DegreeIdentity: 'LM',
      Gender: 'Masculino',
    },
    {
      Name: 'Isaac Espinoza Morales',
      Enrollment: '193535',
      DegreeIdentity: 'LM',
      Gender: 'Masculino',
    },
    {
      Name: 'Sofía Isabel Martínez Paredes',
      Enrollment: '213456',
      DegreeIdentity: 'LA',
      Gender: 'Femenino',
    },
    {
      Name: 'Pedro Antonio Hernández López',
      Enrollment: '175432',
      DegreeIdentity: 'LM',
      Gender: 'Masculino',
    },
    {
      Name: 'Laura Patricia Silva Romero',
      Enrollment: '209876',
      DegreeIdentity: 'LF',
      Gender: 'Femenino',
    },
  ]);

  const filteredAdvisees = advisees.filter((advisee) => {
    const regexName = new RegExp(searchName, 'i');
    const regexStudentId = new RegExp(searchStudentId, 'i');
    const regexCareer = new RegExp(searchCareer, 'i');

    return (
      (!searchName || regexName.test(advisee.Name)) &&
      (!searchStudentId || regexStudentId.test(advisee.Enrollment)) &&
      (!searchCareer || regexCareer.test(advisee.DegreeIdentity))
    );
  });

  return (
    <Container className="mt-4 bg-white" style={{ minHeight: '100vh' }}>
      <Row className="px-2 py-1">
        <Col xs={12} lg={12}>
          <h1 className="fs-3 fw-bold text-start">Asesorados</h1>
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
            <AdvisorTable DataSource={filteredAdvisees} />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Advisees;
