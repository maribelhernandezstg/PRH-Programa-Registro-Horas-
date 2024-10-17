import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import {
  BsPersonBadge,
  BsPersonVideo3,
  BsPersonVcard,
  BsBarChart,
  BsFileArrowUp,
} from 'react-icons/bs';
import './Navbar.css';

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container fluid className="navbar-bar bg-dark text-white">
      <Row>
        <Col
          xs={2}
          className="d-flex justify-content-center align-items-center">
          <Icon className="logo-icon" />
          <div className="logo-text">Asesorías FCFM</div>
        </Col>

        <Col
          xs={10}
          className="d-lg-none d-flex justify-content-end align-items-center">
          <Button variant="outline-light" onClick={toggleNavbar}>
            Menú
          </Button>
        </Col>

        <Col
          xs={12}
          lg={10}
          className={`d-lg-flex justify-content-around align-items-center ${
            isOpen ? 'd-block' : 'd-none'
          }`}>
          <Link to="/asesorias">
            <Button
              variant="outline-light"
              className="d-flex align-items-center justify-content-center custom-button">
              <BsPersonVideo3 className="me-2 fs-4" />
              Asesorías
            </Button>
          </Link>
          <Link to="/asesores">
            <Button
              variant="outline-light"
              className="d-flex align-items-center justify-content-center custom-button">
              <BsPersonBadge className="me-2 fs-4" />
              Asesores
            </Button>
          </Link>
          <Link to="/asesorados">
            <Button
              variant="outline-light"
              className="d-flex align-items-center justify-content-center custom-button">
              <BsPersonVcard className="me-2 fs-4" />
              Asesorados
            </Button>
          </Link>
          <Link to="/reportes">
            <Button
              variant="outline-light"
              className="d-flex align-items-center justify-content-center custom-button">
              <BsBarChart className="me-2 fs-4" />
              Reportes
            </Button>
          </Link>
          <Link to="/excel">
            <Button
              variant="outline-light"
              className="d-flex align-items-center justify-content-center custom-button">
              <BsFileArrowUp className="me-2 fs-4" />
              Excel
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomNavbar;