import '../App.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, Form, Spinner } from 'react-bootstrap';
import { BsArrowDownUp, BsXCircleFill, BsPersonVcardFill, BsPersonBadgeFill, BsMortarboardFill, BsPersonAdd, BsSearch } from 'react-icons/bs';

import AdvisorTable from '../components/Tables/AdvisorTable';
import ClockInModal from '../components/Modals/AdvisorClockIn';
import AdvisorModal from '../components/Modals/AdvisorModal';

import { getAllAdvisorsDummy } from '../services/advisor-service';
import { Advisor } from '../shared/models/advisor.interface';

const Advisors = () => {
  // Estados para manejar los filtros de búsqueda
  const [searchName, setSearchName] = useState('');
  const [searchStudentId, setSearchStudentId] = useState('');
  const [searchCareer, setSearchCareer] = useState('');

  // Estado para manejar el loader
  const [loadingAdvisors, setLoadingAdvisors] = useState(true);

  // Estado para almacenar los asesores
  const [advisors, setAdvisorsData] = useState<Advisor[]>([]);

  // Estados para controlar la visibilidad de los modales
  const [showClockInModal, setShowClockInModal] = useState(false);
  const [showAdvisorModal, setShowAdvisorModal] = useState(false);

  // Funciones para mostrar y cerrar los modales
  //  -- CLOCK IN MODAL --
  const handleShowClockInModal = () => setShowClockInModal(true);
  const handleCloseClockInModal = () => setShowClockInModal(false);
  //  -- ADVISOR MODAL --
  const handleShowAdvisorModal = () => setShowAdvisorModal(true);
  const handleCloseAdvisorModal = () => setShowAdvisorModal(false);

  // Valor inicial para una nuevo asesorado
  const initialAdvisor: Advisor = {
    Enrollment: 0,
    Gender: '',
    Name: '',
    DegreeIdentity: '',
    UserCreation: 0,
    CreatedAt: new Date(0),
    UserUpdate: 0,
    UpdatedAt: new Date(0),
    Active: false,
  };

  // Estado para manejar una nuevo asesor y errores
  const [newAdvisor, setNewAdvisor] = useState<Advisor>(initialAdvisor);
  const [errors, setErrors] = useState<Advisor>(initialAdvisor);

  // Filtra las asesorados según los criterios de búsqueda
  const filteredAdvisors = advisors.filter((advisor) => {
    const regexName = new RegExp(searchName, 'i');
    const regexStudentId = new RegExp(searchStudentId, 'i');
    const regexCareer = new RegExp(searchCareer, 'i');

    return (!searchName || regexName.test(advisor.Name)) && (!searchStudentId || regexStudentId.test(advisor.Enrollment.toString())) && (!searchCareer || regexCareer.test(advisor.DegreeIdentity));
  });

  // Maneja los cambios en los campos de entrada del nuevo asesor
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewAdvisor({ ...newAdvisor, [name]: value });
  };

  // Efecto para cargar los asesores al montar el componente
  useEffect(() => {
    const fetchAdvisors = async () => {
      setLoadingAdvisors(true);
      try {
        const data = await getAllAdvisorsDummy(); // Obtiene los asesores
        setAdvisorsData(data);
      } catch (error) {
        console.error('Error fetching data:', error); // Manejo de errores
      } finally {
        setLoadingAdvisors(false); // Finaliza la carga
      }
    };

    fetchAdvisors();
  }, []);

  return (
    <Container className="mt-4 bg-white" style={{ minHeight: '100vh' }}>
      <Row className="px-2 py-1">
        <Col xs={4} lg={8}>
          <h1 className="fs-3 fw-bold text-start">Asesores</h1>
        </Col>
        <Col xs={8} lg={4} className="d-flex justify-content-end">
          <Button className="button" onClick={handleShowClockInModal}>
            <BsArrowDownUp className="fs-5 me-1" /> Entrada y Salida
          </Button>
        </Col>
      </Row>
      <Row className="shadow-sm rounded p-2 my-2">
        <Col xs={12} lg={8} className="d-flex my-2">
          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon1">
              <BsPersonBadgeFill className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Nombre(s)" aria-label="Nombre(s)" value={searchName} onChange={(e) => setSearchName(e.target.value)} aria-describedby="basic-addon1" />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon2">
              <BsPersonVcardFill className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Matrícula" aria-label="Matrícula" value={searchStudentId} onChange={(e) => setSearchStudentId(e.target.value)} aria-describedby="basic-addon2" />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon3">
              <BsMortarboardFill className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Carrera" aria-label="Carrera" value={searchCareer} onChange={(e) => setSearchCareer(e.target.value)} aria-describedby="basic-addon3" />
          </InputGroup>
        </Col>
        <Col xs={12} lg={4} className="d-flex justify-content-end my-2">
          <Button
            className="button d-flex align-items-center justify-content-center me-1"
            onClick={() => {
              setSearchName('');
              setSearchStudentId('');
              setSearchCareer('');
            }}>
            <BsXCircleFill className="me-1 fs-5" />
            Limpiar
          </Button>
          <Button className="button d-flex align-items-center justify-content-center" onClick={() => console.log('Buscando...')}>
            <BsSearch className="me-1 fs-5" />
            Buscar
          </Button>
        </Col>
      </Row>
      <Row className="shadow-sm rounded overflow-hidden p-2 my-2">
        <Col xs={12} lg={12} className="d-flex justify-content-end my-2">
          <Button className="buttonGreen d-flex align-items-center justify-content-center" variant="success" onClick={handleShowAdvisorModal}>
            <BsPersonAdd className="me-1 fs-5" /> Agregar
          </Button>
        </Col>
        <Col xs={12} lg={12}>
          <Container>
            {loadingAdvisors ? (
              // Loader mientras se cargan las asesores
              <div className="text-center">
                <Spinner animation="grow" />
                <p>Cargando asesores...</p>
              </div>
            ) : (
              // Tabla de asesores filtrados
              <AdvisorTable DataSource={filteredAdvisors} />
            )}
          </Container>
        </Col>
      </Row>
      {/* Modal para fichar */}
      <ClockInModal show={showClockInModal} handleClose={handleCloseClockInModal} />
      <AdvisorModal show={showAdvisorModal} handleClose={handleCloseAdvisorModal} />
    </Container>
  );
};
//Filtros terminados
export default Advisors;
