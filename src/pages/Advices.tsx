import '../App.css';
import { useState } from 'react';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { BsFillFilePersonFill, BsBook, BsPersonWorkspace, BsPersonAdd, BsSearch } from 'react-icons/bs';

import AdviceTable from '../components/Tables/AdviceTable';
import '../components/tables/Styles.css';
const Advices = () => {
  // <------------ Estados para los filtros ------------>
  const [searchAsesorado, setSearchAsesorado] = useState('');
  const [searchMateria, setSearchMateria] = useState('');
  const [searchAsesor, setSearchAsesor] = useState('');
  const registros = [
    {
      AdvisorIdentity: 'Juan Pérez',
      AdviseeIdentity: 'Ana Gómez',
      AdviseeStudentId: '87654321',
      LearningUnitIdentity: 'Matemáticas Avanzadas',
      Topic: 'Álgebra Lineal',
      StartTime: new Date('2024-10-28T10:00:00'),
      EndTime: new Date('2024-10-28T11:00:00'),
    },
    {
      AdvisorIdentity: 'Laura Torres',
      AdviseeIdentity: 'Carlos Ramírez',
      AdviseeStudentId: '12345678',
      LearningUnitIdentity: 'Cálculo Diferencial',
      Topic: 'Cálculo en varias variables',
      StartTime: new Date('2024-10-28T12:00:00'),
      EndTime: new Date('2024-10-28T13:00:00'),
    },
    {
      AdvisorIdentity: 'Mario Fernández',
      AdviseeIdentity: 'Lucía Morales',
      AdviseeStudentId: '23456789',
      LearningUnitIdentity: 'Física General',
      Topic: 'Leyes de Newton',
      StartTime: new Date('2024-10-28T14:00:00'),
      EndTime: new Date('2024-10-28T15:00:00'),
    },
    {
      AdvisorIdentity: 'Lic. Sofía García',
      AdviseeIdentity: 'Raúl Herrera',
      AdviseeStudentId: '34567890',
      LearningUnitIdentity: 'Química Orgánica',
      Topic: 'Reacciones orgánicas',
      StartTime: new Date('2024-10-29T09:00:00'),
      EndTime: new Date('2024-10-29T10:00:00'),
    },
    {
      AdvisorIdentity: 'Pedro Sánchez',
      AdviseeIdentity: 'Mariana Ortiz',
      AdviseeStudentId: '45678901',
      LearningUnitIdentity: 'Introducción a la Programación',
      Topic: 'Estructuras de control',
      StartTime: new Date('2024-10-29T11:00:00'),
      EndTime: new Date('2024-10-29T12:00:00'),
    },
    {
      AdvisorIdentity: 'Alberto Díaz',
      AdviseeIdentity: 'Gabriel Torres',
      AdviseeStudentId: '56789012',
      LearningUnitIdentity: 'Bases de Datos',
      Topic: 'Modelo relacional',
      StartTime: new Date('2024-10-29T13:00:00'),
      EndTime: new Date('2024-10-29T14:00:00'),
    },
    {
      AdvisorIdentity: 'Verónica Ruiz',
      AdviseeIdentity: 'Daniela Sánchez',
      AdviseeStudentId: '67890123',
      LearningUnitIdentity: 'Lógica Computacional',
      Topic: 'Tablas de verdad',
      StartTime: new Date('2024-10-29T15:00:00'),
      EndTime: new Date('2024-10-29T16:00:00'),
    },
    {
      AdvisorIdentity: 'Hugo López',
      AdviseeIdentity: 'Ricardo Vega',
      AdviseeStudentId: '78901234',
      LearningUnitIdentity: 'Cálculo Integral',
      Topic: 'Integración por partes',
      StartTime: new Date('2024-10-30T08:00:00'),
      EndTime: new Date('2024-10-30T09:00:00'),
    },
    {
      AdvisorIdentity: 'Elena Ríos',
      AdviseeIdentity: 'Carla Núñez',
      AdviseeStudentId: '89012345',
      LearningUnitIdentity: 'Inteligencia Artificial',
      Topic: 'Redes neuronales',
      StartTime: new Date('2024-10-30T10:00:00'),
      EndTime: new Date('2024-10-30T11:00:00'),
    },
    {
      AdvisorIdentity: 'Miguel Luna',
      AdviseeIdentity: 'José Pérez',
      AdviseeStudentId: '90123456',
      LearningUnitIdentity: 'Ingeniería de Software',
      Topic: 'Metodologías ágiles',
      StartTime: new Date('2024-10-30T12:00:00'),
      EndTime: new Date('2024-10-30T13:00:00'),
    },
  ];

  const filteredRegistros = registros.filter((registro) => registro.AdviseeIdentity.toLowerCase().includes(searchAsesorado.toLowerCase()) && registro.LearningUnitIdentity.toLowerCase().includes(searchMateria.toLowerCase()) && registro.AdvisorIdentity.toLowerCase().includes(searchAsesor.toLowerCase()));

  return (
    <Container className="mt-3">
      <Row>
        <Col xs={12} lg={12}>
          <h1 className="fs-3 fw-bold text-start">Asesorías</h1>
        </Col>
        <Col xs={12} lg={8} className="d-flex my-2">
          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon1">
              {' '}
              <BsFillFilePersonFill className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Asesorado" aria-label="Asesorado" value={searchAsesorado} aria-describedby="basic-addon1" onChange={(e) => setSearchAsesorado(e.target.value)} />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon2">
              {' '}
              <BsBook className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Materia" aria-label="Materia" value={searchMateria} aria-describedby="basic-addon2" onChange={(e) => setSearchMateria(e.target.value)} />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon3">
              {' '}
              <BsPersonWorkspace className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Asesor" aria-label="Asesor" value={searchAsesor} aria-describedby="basic-addon3" onChange={(e) => setSearchAsesor(e.target.value)} />
          </InputGroup>
        </Col>

        <Col xs={12} lg={4} className="d-flex justify-content-end my-2">
          <Button className="button -flex align-items-center justify-content-center me-3" onClick={() => console.log('Buscando...')}>
            <BsSearch className="me-1 fs-5" />
            Buscar
          </Button>
          <Button className="button -flex align-items-center justify-content-center" variant="success">
            <BsPersonAdd className="me-1 fs-5" /> Agregar
          </Button>
        </Col>

        <Col xs={12} lg={12}>
          <div className="table-container">
            <AdviceTable DataSource={filteredRegistros} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Advices;
