import { Container, Row, Button, InputGroup, Col, Form } from 'react-bootstrap';
import '../App.css';
import { useState } from 'react';
import AdvisorTable from '../components/Tables/AdvisorTable';
import { BsPersonVcardFill, BsPersonBadgeFill, BsMortarboardFill, BsXCircleFill, BsPersonAdd, BsSearch } from 'react-icons/bs';

const Advisees = () => {
  const [searchName] = useState('');
  const [searchStudentId] = useState('');
  const [searchCareer] = useState('');

  const [advisees, setAdviseesData] = useState([
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
      Name: 'Maria Lopez',
      Enrollment: '193456',
      DegreeIdentity: 'LSTI',
      Gender: 'Femenino',
    },
    {
      Name: 'Juan Perez',
      Enrollment: '189874',
      DegreeIdentity: 'LMAD',
      Gender: 'Masculino',
    },
    {
      Name: 'Carla Mendoza',
      Enrollment: '204567',
      DegreeIdentity: 'LCC',
      Gender: 'Femenino',
    },
    {
      Name: 'Luis Torres',
      Enrollment: '176543',
      DegreeIdentity: 'LCC',
      Gender: 'Masculino',
    },
    {
      Name: 'Ana Gonzalez',
      Enrollment: '215678',
      DegreeIdentity: 'LF',
      Gender: 'Femenino',
    },
    {
      Name: 'Daniel Ramirez',
      Enrollment: '198765',
      DegreeIdentity: 'LM',
      Gender: 'Masculino',
    },
    {
      Name: 'Sofia Martinez',
      Enrollment: '213456',
      DegreeIdentity: 'LA',
      Gender: 'Femenino',
    },
    {
      Name: 'Pedro Hernandez',
      Enrollment: '175432',
      DegreeIdentity: 'LM',
      Gender: 'Masculino',
    },
    {
      Name: 'Laura Silva',
      Enrollment: '209876',
      DegreeIdentity: 'LF',
      Gender: 'Femenino',
    },
  ]);

  const filteredAdvisees = advisees.filter((advisee) => advisee.Name.toLowerCase().includes(searchName.toLowerCase()) && advisee.DegreeIdentity.toLowerCase().includes(searchStudentId.toLowerCase()) && advisee.Enrollment.toLowerCase().includes(searchCareer.toLowerCase()));

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
            <AdvisorTable DataSource={filteredAdvisees} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Advisees;
