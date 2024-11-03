import { useState } from 'react';
import { Container, Row, Col, Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdvicesDepartmentIcon from '../../assets/AsesoriasIcon.jpeg';
import { BsPersonBadge, BsPersonVideo3, BsPersonVcard, BsBarChart, BsFileArrowUp, BsList, BsPersonFill } from 'react-icons/bs';
import './Navbar.css';

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar sticky="top" className="p-0">
      <Container fluid className="navbar-bar text-white justify-content-center">
        <Row className="w-75">
          <Col xs={10} lg={4} className="d-flex">
            <Link to="/home" className="justify-content-center align-items-center me-4 logo-container">
              <img src={AdvicesDepartmentIcon} alt="Icon" className="rounded logo-icon" />

              <div className="logo-text fw-bold fs-4 text-center">ASESORÍAS FCFM</div>
            </Link>
          </Col>

          <Col xs={2} lg={0} className="d-lg-none">
            <Button variant="outline-light" onClick={toggleNavbar} className="menu-toggle-btn">
              <BsList /> Menú
            </Button>
          </Col>

          <Col xs={12} lg={8} className={`d-lg-flex align-items-center justify-content-between ${isOpen ? 'd-block' : 'd-none'}`}>
            <Link to="/asesorias" className="d-flex align-items-center justify-content-center custom-button mx-1">
              <Button variant="outline-light">
                <BsPersonVideo3 className="me-1 fs-4" />
                Asesorías
              </Button>
            </Link>
            <Link to="/asesores" className="d-flex align-items-center justify-content-center custom-button mx-1">
              <Button variant="outline-light">
                <BsPersonBadge className="me-1 fs-4" />
                Asesores
              </Button>
            </Link>
            <Link to="/asesorados" className="d-flex align-items-center justify-content-center custom-button mx-1">
              <Button variant="outline-light">
                <BsPersonVcard className="me-1 fs-4" />
                Asesorados
              </Button>
            </Link>
            <Link to="/reportes" className="d-flex align-items-center justify-content-center custom-button mx-1">
              <Button variant="outline-light">
                <BsBarChart className="me-1 fs-4" />
                Reportes
              </Button>
            </Link>
            <Link to="/excel" className="d-flex align-items-center justify-content-center custom-button mx-1">
              <Button variant="outline-light">
                <BsFileArrowUp className="me-1 fs-4" />
                Excel
              </Button>
            </Link>
            <Link to="/usuarios" className="d-flex align-items-center justify-content-center custom-button mx-1">
              <Button variant="outline-light">
                <BsPersonFill className="me-1 fs-4" />
                Usuarios
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
