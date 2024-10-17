import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Bienvenido al Sistema de Registro de Horas</h1>
          <p>
            Este es el sistema donde podrás gestionar el registro y seguimiento
            de tus horas laborales. Navega por las diferentes secciones para
            acceder a las funcionalidades que necesites.
          </p>
          <p>
            Puedes empezar revisando tu perfil o los proyectos asignados desde
            el menú superior.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
