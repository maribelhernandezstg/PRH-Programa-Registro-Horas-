import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsPersonVcard, BsKey } from 'react-icons/bs'; // Importa los iconos que quieras usar
import AdvicesDepartmentImage from '../../assets/Asesorias1.jpeg';

import '../../App.css';
import './Login.css';

const Login = () => {
  return (
    <div className="backgroundPattern">
      <Container className="d-flex align-items-center containerHeight px-4">
        <Row id="transparentRow" className="d-flex flex-row justify-content-center align-items-center p-4 card shadow">
          <Col md={8} lg={6} xl={6} className="p-5 d-flex mb-auto flex-column">
            <Col xs={12} lg={12} className="px-2 pt-2">
              <p className="fs-1 fw-bold header mb-4 text-white text-center">Departamento de Asesorias</p>
              <p className="fs-3 fw-semibold text-start text-white">Inicio de sesión</p>
            </Col>
            <Form className="p-2">
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label className="text-white">Matrícula</Form.Label>
                <InputGroup className="shadow">
                  <InputGroup.Text>
                    <BsPersonVcard className="fs-5" />
                  </InputGroup.Text>
                  <Form.Control type="email" placeholder="Ingresa tu matrícula" required />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label className="text-white">Contraseña</Form.Label>
                <InputGroup className="shadow">
                  <InputGroup.Text>
                    <BsKey className="fs-5" />
                  </InputGroup.Text>
                  <Form.Control type="password" placeholder="Ingresa tu contraseña" required />
                </InputGroup>
              </Form.Group>

              <Link to={'/home'} className="d-flex justify-content-center">
                <Button id="submitBtn" className="mt-3 text-white shadow">
                  Iniciar Sesión
                </Button>
              </Link>
            </Form>
          </Col>
          <Col xs={10} md={8} lg={6} xl={6} className="d-flex justify-content-center align-items-center">
            <div className="imgContainer">
              <img src={AdvicesDepartmentImage} className="img-fluid rounded shadow" alt="Phone image" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
