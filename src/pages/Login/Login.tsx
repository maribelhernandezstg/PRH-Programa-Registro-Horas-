import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsPersonVcard, BsKey } from 'react-icons/bs';
import AdvicesDepartmentImage from '../../assets/Asesorias1.jpeg';

import { UserService } from '../../services/user-service';
import CustomToast from '../../components/Toast/Toast';

import '../../App.css';
import './Login.css';

const Login = () => {
  const userService = new UserService();
  const [enrollment, setEnrollment] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger' | 'info' | 'warning'>('info');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const enrollmentNumber = parseInt(enrollment);

    if (isNaN(enrollmentNumber)) {
      setToastMessage('La matrícula debe ser un número válido');
      setToastType('warning');
      setShowToast(true);
      setLoading(false);
      return;
    }

    try {
      await userService.logIn(enrollmentNumber, password);
      navigate('/home');
    } catch (error: any) {
      setToastMessage(error.message);
      setToastType('warning');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backgroundPattern">
      <Container className="d-flex align-items-center containerHeight px-4">
        <Row id="transparentRow" className="d-flex flex-row justify-content-center align-items-center p-4 card shadow">
          <Col md={8} lg={6} xl={6} className="p-5 d-flex mb-auto flex-column">
            <Col xs={12} lg={12} className="px-2 pt-2">
              <p className="fs-1 fw-bold header mb-4 text-white text-center">Departamento de Asesorias</p>
              <p className="fs-3 fw-semibold text-start text-white">Inicio de sesión</p>
            </Col>
            <Form className="p-2" onSubmit={handleLogin}>
              <Form.Group controlId="formEnrollment" className="mb-3">
                <Form.Label className="text-white">Matrícula</Form.Label>
                <InputGroup className="shadow">
                  <InputGroup.Text>
                    <BsPersonVcard className="fs-5" />
                  </InputGroup.Text>
                  <Form.Control type="text" placeholder="Ingresa tu matrícula" value={enrollment} onChange={(e) => setEnrollment(e.target.value)} required />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label className="text-white">Contraseña</Form.Label>
                <InputGroup className="shadow">
                  <InputGroup.Text>
                    <BsKey className="fs-5" />
                  </InputGroup.Text>
                  <Form.Control type="password" placeholder="Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </InputGroup>
              </Form.Group>
              <Button id="submitBtn" className="mt-3 text-white shadow" type="submit" disabled={loading}>
                {loading ? 'Cargando...' : 'Iniciar Sesión'}
              </Button>
            </Form>
          </Col>
          <Col xs={10} md={8} lg={6} xl={6} className="d-flex justify-content-center align-items-center">
            <div className="imgContainer">
              <img src={AdvicesDepartmentImage} className="img-fluid rounded shadow" alt="Phone image" />
            </div>
          </Col>
          <CustomToast show={showToast} message={toastMessage} type={toastType} duration={3000} onClose={() => setShowToast(false)} />
        </Row>
      </Container>
    </div>
  );
};

export default Login;
