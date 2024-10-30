import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdvicesDepartmentIcon from "../../assets/AsesoriasIcon.jpeg";
import {
  BsPersonBadge,
  BsPersonVideo3,
  BsPersonVcard,
  BsBarChart,
  BsFileArrowUp,
  BsList,
  BsPersonPlus,
} from "react-icons/bs";
import "./Navbar.css";

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container fluid className="navbar-bar text-white justify-content-center">
      <Row className="w-75">
        <Col xs={10} lg={4}>
          <Link
            to="/"
            className="d-flex justify-content-center align-items-center me-4 logo-container"
          >
            <div>
              <img
                src={AdvicesDepartmentIcon}
                alt="Icon"
                className="rounded logo-icon"
              />
            </div>
            <div className="logo-text fw-bold fs-5 text-center">
              ASESORÍAS FCFM
            </div>
          </Link>
        </Col>

        <Col xs={2} lg={0} className="d-lg-none">
          <Button
            variant="outline-light"
            onClick={toggleNavbar}
            className="menu-toggle-btn"
          >
            <BsList /> Menú
          </Button>
        </Col>

        <Col
          xs={12}
          lg={8}
          className={`d-lg-flex align-items-center justify-content-between ${
            isOpen ? "d-block" : "d-none"
          }`}
        >
          <Link
            to="/asesorias"
            className="d-flex align-items-center justify-content-center custom-button mx-1"
          >
            <Button variant="outline-light">
              <BsPersonVideo3 className="me-1 fs-4" />
              Asesorías
            </Button>
          </Link>
          <Link
            to="/asesores"
            className="d-flex align-items-center justify-content-center custom-button mx-1"
          >
            <Button variant="outline-light">
              <BsPersonBadge className="me-1 fs-4" />
              Asesores
            </Button>
          </Link>
          <Link
            to="/asesorados"
            className="d-flex align-items-center justify-content-center custom-button mx-1"
          >
            <Button variant="outline-light">
              <BsPersonVcard className="me-1 fs-4" />
              Asesorados
            </Button>
          </Link>
          <Link
            to="/reportes"
            className="d-flex align-items-center justify-content-center custom-button mx-1"
          >
            <Button variant="outline-light">
              <BsBarChart className="me-1 fs-4" />
              Reportes
            </Button>
          </Link>
          <Link
            to="/excel"
            className="d-flex align-items-center justify-content-center custom-button mx-1"
          >
            <Button variant="outline-light">
              <BsFileArrowUp className="me-1 fs-4" />
              Excel
            </Button>
          </Link>
          <Link
            to="/excel"
            className="d-flex align-items-center justify-content-center custom-button mx-1"
          >
            <Button variant="outline-light">
              <BsPersonPlus className="me-1 fs-4" />
              Agregar
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomNavbar;
