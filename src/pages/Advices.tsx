import '../App.css';
import { useState } from 'react';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { BsFillFilePersonFill, BsBook, BsPersonWorkspace, BsPlusSquareFill, BsSearch, BsXCircleFill } from 'react-icons/bs';

import AdviceTable from '../components/Tables/AdviceTable';
import '../components/tables/Styles.css';
const Advices = () => {
  // <------------ Filters ------------>
  const [searchAdvisee, setSearchAdvisee] = useState('');
  const [searchLearningUnit, setSearchLearningUnit] = useState('');
  const [searchAdvisor, setSearchAdvisor] = useState('');
  const [advices, setAdvicesData] = useState([
    {
      AdvisorIdentity: 'Ricardo Alberto Grimaldo Estévez',
      AdviseeIdentity: 'Ana Isabel Gómez García',
      AdviseeStudentId: '87654321',
      LearningUnitIdentity: 'Matemáticas Avanzadas',
      Topic: 'Álgebra Lineal',
      StartTime: new Date('2024-10-28T10:00:00'),
      EndTime: new Date('2024-10-28T11:00:00'),
    },
    {
      AdvisorIdentity: 'Laura Patricia Torres Morales',
      AdviseeIdentity: 'Carlos Eduardo Ramírez Sánchez',
      AdviseeStudentId: '12345678',
      LearningUnitIdentity: 'Cálculo Diferencial',
      Topic: 'Cálculo en varias variables',
      StartTime: new Date('2024-10-28T12:00:00'),
      EndTime: new Date('2024-10-28T13:00:00'),
    },
    {
      AdvisorIdentity: 'Mario Antonio Fernández Ríos',
      AdviseeIdentity: 'Lucía Fernanda Morales Pérez',
      AdviseeStudentId: '23456789',
      LearningUnitIdentity: 'Física General',
      Topic: 'Leyes de Newton',
      StartTime: new Date('2024-10-28T14:00:00'),
      EndTime: new Date('2024-10-28T15:00:00'),
    },
    {
      AdvisorIdentity: 'Sofía Alejandra García Ruiz',
      AdviseeIdentity: 'Raúl Enrique Herrera Gutiérrez',
      AdviseeStudentId: '34567890',
      LearningUnitIdentity: 'Química Orgánica',
      Topic: 'Reacciones orgánicas',
      StartTime: new Date('2024-10-29T09:00:00'),
      EndTime: new Date('2024-10-29T10:00:00'),
    },
    {
      AdvisorIdentity: 'Pedro José Sánchez Castillo',
      AdviseeIdentity: 'Mariana Isabel Ortiz Paredes',
      AdviseeStudentId: '45678901',
      LearningUnitIdentity: 'Introducción a la Programación',
      Topic: 'Estructuras de control',
      StartTime: new Date('2024-10-29T11:00:00'),
      EndTime: new Date('2024-10-29T12:00:00'),
    },
    {
      AdvisorIdentity: 'Alberto Antonio Díaz Rodríguez',
      AdviseeIdentity: 'Gabriel Eduardo Torres Mendoza',
      AdviseeStudentId: '56789012',
      LearningUnitIdentity: 'Bases de Datos',
      Topic: 'Modelo relacional',
      StartTime: new Date('2024-10-29T13:00:00'),
      EndTime: new Date('2024-10-29T14:00:00'),
    },
    {
      AdvisorIdentity: 'Verónica Alejandra Ruiz Méndez',
      AdviseeIdentity: 'Daniela Sofía Sánchez Morales',
      AdviseeStudentId: '67890123',
      LearningUnitIdentity: 'Lógica Computacional',
      Topic: 'Tablas de verdad',
      StartTime: new Date('2024-10-29T15:00:00'),
      EndTime: new Date('2024-10-29T16:00:00'),
    },
    {
      AdvisorIdentity: 'Hugo Felipe López Ortega',
      AdviseeIdentity: 'Ricardo Esteban Vega Fernández',
      AdviseeStudentId: '78901234',
      LearningUnitIdentity: 'Cálculo Integral',
      Topic: 'Integración por partes',
      StartTime: new Date('2024-10-30T08:00:00'),
      EndTime: new Date('2024-10-30T09:00:00'),
    },
    {
      AdvisorIdentity: 'Elena María Ríos García',
      AdviseeIdentity: 'Carla Patricia Núñez Castillo',
      AdviseeStudentId: '89012345',
      LearningUnitIdentity: 'Inteligencia Artificial',
      Topic: 'Redes neuronales',
      StartTime: new Date('2024-10-30T10:00:00'),
      EndTime: new Date('2024-10-30T11:00:00'),
    },
    {
      AdvisorIdentity: 'Miguel Ángel Luna Hernández',
      AdviseeIdentity: 'José Manuel Pérez Medina',
      AdviseeStudentId: '90123456',
      LearningUnitIdentity: 'Ingeniería de Software',
      Topic: 'Metodologías ágiles',
      StartTime: new Date('2024-10-30T12:00:00'),
      EndTime: new Date('2024-10-30T13:00:00'),
    },
  ]);
  
  const filteredAdvices = advices.filter((advice) => {
    const regexAdvisee = new RegExp(searchAdvisee, 'i'); // Filtro para Asesorado
    const regexLearningUnit = new RegExp(searchLearningUnit, 'i'); // Filtro para Materia ambos tiene un problema con í o letras con acento
    const regexAdvisor = new RegExp(searchAdvisor, 'i'); // Filtro para Asesor
  
    // Verificamos si hay valor
    return (
      (!searchAdvisee || regexAdvisee.test(advice.AdviseeIdentity)) &&
      (!searchLearningUnit || regexLearningUnit.test(advice.LearningUnitIdentity)) &&
      (!searchAdvisor || regexAdvisor.test(advice.AdvisorIdentity))
    );
  });

  return (
    <Container className="mt-4 bg-white" style={{ minHeight: '100vh' }}>
      <Row className="px-2 py-1">
        <Col xs={12} lg={12}>
          <h1 className="fs-3 fw-bold text-start">Asesorías</h1>
        </Col>
      </Row>
      <Row className="shadow-sm rounded p-2 my-2">
        <Col xs={12} lg={8} className="d-flex my-2">
          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon1">
              {' '}
              <BsFillFilePersonFill className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Asesorado" aria-label="Asesorado" value={searchAdvisee} aria-describedby="basic-addon1" onChange={(e) => setSearchAdvisee(e.target.value)} />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon2">
              {' '}
              <BsBook className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Materia" aria-label="Materia" value={searchLearningUnit} aria-describedby="basic-addon2" onChange={(e) => setSearchLearningUnit(e.target.value)} />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon3">
              {' '}
              <BsPersonWorkspace className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Asesor" aria-label="Asesor" value={searchAdvisor} aria-describedby="basic-addon3" onChange={(e) => setSearchAdvisor(e.target.value)} />
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
            <BsPlusSquareFill className="me-1 fs-5" /> Nueva
          </Button>
        </Col>
        <Col xs={12} lg={12}>
          <Container>
            <AdviceTable DataSource={filteredAdvices} />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Advices;
