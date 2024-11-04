import { Container, Row, Col } from 'react-bootstrap';
import AdvicesDepartmentImage from '../assets/Asesorias1.jpeg';

const Home = () => {
  return (
    <Container style={{ height: '100vh' }}>
      <Row className="mt-4 d-flex allign-items-center justify-content-center">
        <Col xs={12} md={8}>
          <div className="fs-2 fw-bold text-start">Bienvenido al Sistema de Registro de Horas</div>
          <p className="fs-5 text-start pt-2 pb-2">Este es el sistema donde podrás gestionar el registro y seguimiento de tus horas laborales. Navega por las diferentes secciones para acceder a las funcionalidades que necesites.</p>
          <p className="text-primary text-start">Puedes empezar revisando tu perfil o los proyectos asignados desde el menú superior.</p>
        </Col>
        <Col xs={12} md={4}>
          <img src={AdvicesDepartmentImage} alt="Imagen Ejemplo" className="img-fluid rounded" />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
