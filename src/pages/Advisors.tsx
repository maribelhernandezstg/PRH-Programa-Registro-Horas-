import '../App.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, Form, Spinner } from 'react-bootstrap';
import { BsArrowDownUp, BsXCircleFill, BsPersonVcardFill, BsPersonBadgeFill, BsMortarboardFill, BsPersonAdd, BsArrowClockwise } from 'react-icons/bs';

import CustomToast from '../components/Toast/Toast';

import AdvisorTable from '../components/Tables/AdvisorTable';
import ClockInModal from '../components/Modals/AdvisorClockIn';
import AdvisorModal from '../components/Modals/AdvisorModal';

import { AdvisorService } from '../services/advisor-service';
import { Advisor } from '../shared/models/advisor.class';

import { DegreeService } from '../services/degree-service';
import { Degree } from '../shared/models/degree.class';

const Advisors = () => {
  //Instancia de mi servicio
  const advisorService = new AdvisorService();
  const degreeService = new DegreeService();

  // Estados para manejar los filtros de búsqueda
  const [searchName, setSearchName] = useState('');
  const [searchStudentId, setSearchStudentId] = useState('');
  const [searchCareer, setSearchCareer] = useState('');

  // Estado para manejar el loader
  const [loadingAdvisors, setLoadingAdvisors] = useState(true);

  // Estado para almacenar los asesores
  const [advisors, setAdvisorsData] = useState<Advisor[]>([]);

  // Estado para almacenar las carreras
  const [degrees, setDegresData] = useState<Degree[]>([]);

  // Estados para controlar la visibilidad de los modales
  const [showClockInModal, setShowClockInModal] = useState(false);
  const [showAdvisorModal, setShowAdvisorModal] = useState(false);

  // Estado para manejar el asesor seleccionado para editar
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor>(new Advisor());

  // Estados para controlar el toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger' | 'info' | 'warning'>('info');

  // Estado para controlar si se esta editando
  const [isEditing, setIsEditing] = useState(false);

  // Funciones para mostrar y cerrar los modales
  const handleShowClockInModal = () => setShowClockInModal(true);
  const handleCloseClockInModal = () => setShowClockInModal(false);

  // Funciones para mostrar modal
  const handleShowAdvisorModal = () => {
    setShowAdvisorModal(true);
    setIsEditing(false);
  };

  // Estado para controlar el toast
  type ToastType = 'success' | 'danger' | 'info' | 'warning';
  const handleToast = (message: string, type: ToastType, show: boolean) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(show);
  };

  // Estado guardar/actualizar el asesor
  const handleSaveAdvisor = async (advisor: Advisor) => {
    setLoadingAdvisors(true);
    if (isEditing) {
      try {
        const response = await advisorService.updateAdvisor(advisor.Enrollment, advisor);
        if (response) {
          setAdvisorsData((prevAdvisors) => prevAdvisors.map((existingAdvisor) => (existingAdvisor.Enrollment === advisor.Enrollment ? advisor : existingAdvisor)));
          handleToast('Se ha actualizado el asesor correctamente', 'success', true);
        }
      } catch (error: any) {
        handleToast(error.message, 'warning', true);
      } finally {
        setLoadingAdvisors(false);
      }
    } else {
      try {
        const response = await advisorService.createAdvisor(advisor);
        if (response) {
          setAdvisorsData((prevAdvisors) => [...prevAdvisors, advisor]);
          handleToast('Se ha creado el asesor correctamente', 'success', true);
        }
      } catch (error: any) {
        handleToast(error.message, 'warning', true);
      } finally {
        setLoadingAdvisors(false);
      }
    }
  };

  // Filtrar Registros
  const filteredAdvisors = advisors.filter((register) => register.Name.toLowerCase().includes(searchName.toLowerCase()) && register.Enrollment.toString().includes(searchStudentId.toLowerCase()) && register.DegreeIdentity.toString().includes(searchCareer.toLowerCase()));

  // Función para manejar el cambio de carrera en el dropdown
  const handleCareerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCareer(event.target.value);
  };

  // Seleccionar Asesor
  const handleSelectAdvisor = (advisor: Advisor) => {
    setSelectedAdvisor(advisor);
    setShowAdvisorModal(true);
    setIsEditing(true);
  };

  //Obtener Carreras
  const getDegrees = async () => {
    try {
      const data = await degreeService.getDegrees();
      setDegresData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Obtener Asesores
  const getAdvisors = async () => {
    setLoadingAdvisors(true);
    try {
      const data = await advisorService.getAllAdvisors();
      setAdvisorsData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingAdvisors(false);
    }
  };

  // Efecto para cargar los asesores al montar el componente
  useEffect(() => {
    const fetchAdvisors = async () => {
      getDegrees();
      getAdvisors();
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
            <Form.Select aria-label="Carrera" value={searchCareer} onChange={handleCareerChange}>
              <option value="">Carrera</option>
              {degrees.map((degree) => (
                <option key={degree.Identity} value={degree.Identity}>
                  {degree.ShortName}
                </option>
              ))}
            </Form.Select>
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
            Limpiar Filtros
          </Button>
        </Col>
      </Row>
      <Row className="shadow-sm rounded overflow-hidden p-2 my-2">
        <Col xs={12} lg={12} className="d-flex justify-content-between my-2">
          <Button className="button d-flex align-items-center justify-content-center" variant="success" onClick={getAdvisors}>
            <BsArrowClockwise className=" fs-5" />
          </Button>
          <Button className="buttonGreen d-flex align-items-center justify-content-center" variant="success" onClick={handleShowAdvisorModal}>
            <BsPersonAdd className="me-1 fs-5" /> Agregar
          </Button>
        </Col>
        <Col xs={12} lg={12}>
          <Container>
            {loadingAdvisors ? (
              <div className="text-center">
                <Spinner animation="grow" />
                <p>Cargando asesores...</p>
              </div>
            ) : (
              <AdvisorTable DataSource={filteredAdvisors} handleEditAdvisor={handleSelectAdvisor} />
            )}
          </Container>
        </Col>
      </Row>
      <ClockInModal show={showClockInModal} handleClose={handleCloseClockInModal} />
      <AdvisorModal show={showAdvisorModal} isEditing={isEditing} setShowAdvisorModal={setShowAdvisorModal} advisor={selectedAdvisor} setSelectedAdvisor={setSelectedAdvisor} handleSaveAdvisor={handleSaveAdvisor} />
      <CustomToast show={showToast} message={toastMessage} type={toastType} duration={3000} onClose={() => setShowToast(false)} />
    </Container>
  );
};

export default Advisors;
