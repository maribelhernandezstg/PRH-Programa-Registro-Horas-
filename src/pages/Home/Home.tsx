import { Container, Row, Col } from 'react-bootstrap';
import AdvicesDepartentImage from '../../assets/Asesorias1.jpeg';
import './Home.css';

const Home = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col xs={12} md={8}>
          <div className="header-text">
            Bienvenido al Sistema de Registro de Horas
          </div>
          <p className="lead-text">
            Este es el sistema donde podrás gestionar el registro y seguimiento
            de tus horas laborales. Navega por las diferentes secciones para
            acceder a las funcionalidades que necesites.
          </p>
          <p className="secondary-text">
            Puedes empezar revisando tu perfil o los proyectos asignados desde
            el menú superior.
          </p>
        </Col>
        <Col xs={12} md={4}>
          <img
            src={AdvicesDepartentImage}
            alt="Imagen Ejemplo"
            className="img-fluid custom-img"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
