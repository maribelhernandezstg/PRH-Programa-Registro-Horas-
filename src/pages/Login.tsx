import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsPersonVcard, BsKey } from 'react-icons/bs'; // Importa los iconos que quieras usar
import AdvicesDepartmentImage from '../assets/Asesorias1.jpeg';

import '../App.css';

const Login = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center mt-4 p-4 card">
      <Row>
        <Col md={4} lg={8} xl={6}>
          <img src={AdvicesDepartmentImage} className="img-fluid" alt="Phone image" />
        </Col>
        <Col md={8} lg={4} xl={6}>
          <Col xs={12} lg={12}>
            <h1 className="fs-3 fw-bold text-start">Inicio de sesión</h1>
          </Col>
          <Form>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label className="fw-bold">Matrícula</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <BsPersonVcard className="fs-5" />
                </InputGroup.Text>
                <Form.Control type="email" placeholder="Ingresa tu matrícula" required />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label className="fw-bold">Contraseña</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <BsKey className="fs-5" />
                </InputGroup.Text>
                <Form.Control type="password" placeholder="Ingresa tu contraseña" required />
              </InputGroup>
            </Form.Group>

            <Link to={'/'} className="d-flex justify-content-center">
              <Button variant="primary" className="mt-3">
                Iniciar Sesión
              </Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
