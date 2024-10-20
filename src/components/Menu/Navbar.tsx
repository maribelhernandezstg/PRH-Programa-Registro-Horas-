import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdvicesDepartmentIcon from '../../assets/AsesoriasIcon.jpeg';
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
    <Container
      fluid
      className="navbar-bar bg-dark text-white d-flex justify-content-center w-100">
      <Row className="ms-1 me-1 w-75">
        <Col
          xs={2}
          lg={3}
          className="d-flex justify-content-center align-items-center">
          <div>
            <img
              src={AdvicesDepartmentIcon}
              alt="Icon"
              className="rounded logo-icon"
            />
          </div>
          <div className="logo-text fw-bold fs-5 text-start lh-sm">
            ASESORÍAS FCFM
          </div>
        </Col>

        <Col
          xs={10}
          lg={9}
          className="d-lg-none d-flex justify-content-end align-items-center">
          <Button variant="outline-light" onClick={toggleNavbar}>
            Menú
          </Button>
        </Col>

        <Col
          xs={12}
          lg={9}
          className={`d-lg-flex justify-content-between align-items-center ${
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
