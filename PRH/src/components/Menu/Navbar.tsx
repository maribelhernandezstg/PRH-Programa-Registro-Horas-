import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import "./Navbar.css";

const CustomNavbar = () => {
  return (
    <Container fluid className="navbar-bar bg-dark text-white">
      <Row>
        {/* Columna para el logo */}
        <Col
          xs={2}
          className="d-flex justify-content-center align-items-center"
        >
          <Icon className="logo-icon" />
          <div className="logo-text">LOGO PROVISIONAL</div>
        </Col>

        <Col
          xs={10}
          className="d-flex justify-content-around align-items-center"
        >
          <Button variant="outline-light">Excel</Button>
          <Button variant="outline-light">Reportes</Button>
          <Button variant="outline-light">Asesorías</Button>
          <Button variant="outline-light">Asesorados</Button>
          <Button variant="outline-light">Asesores</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomNavbar;
