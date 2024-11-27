import '../App.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, Form, Spinner } from 'react-bootstrap';
import { BsFillFilePersonFill, BsBook, BsPersonWorkspace, BsPlusSquareFill, BsXCircleFill } from 'react-icons/bs';

import CustomToast from '../components/Toast/Toast';

import AdviceTable from '../components/Tables/AdviceTable'; // Componente para mostrar la tabla de asesorías
import AdviceModal from '../components/Modals/AdvisorySessionModal'; // Componente modal para añadir/editar asesorías

import { AdvisorySessionService } from '../services/advisory-session-service';
import { AdvisorySession } from '../shared/models/advisory-session.class'; // Interfaz para el modelo de sesión de asesoría

import { LearningUnitService } from '../services/learning-units-service';
import { LearningUnit } from '../shared/models/learning-unit.class';

import { Advisor } from '../shared/models/advisor.class';
import { AdvisorService } from '../services/advisor-service';

import { Advisee } from '../shared/models/advisee.class';
import { AdviseeService } from '../services/advisee-service';

const Advices = () => {
  //Instancia de mi servicio
  const advisorySessionsService = new AdvisorySessionService();

  const [advisees, setAdvisees] = useState<Advisee[]>([]); // Almacenar asesorados activos
  const [advisors, setAdvisors] = useState<Advisor[]>([]); // Estado para los asesores activos
  const [learningUnits, setLearningUnits] = useState<LearningUnit[]>([]);

  // Estados para manejar los filtros de búsqueda
  const [searchAdvisee, setSearchAdvisee] = useState('');
  const [searchLearningUnit, setSearchLearningUnit] = useState('');
  const [searchAdvisor, setSearchAdvisor] = useState('');

  // Estado para manejar el loader
  const [loadingAdvices, setLoadingAdvices] = useState(true);

  // Estado para almacenar los asesorias
  const [advices, setAdvicesData] = useState<AdvisorySession[]>([]);

  // Estados para controlar la visibilidad de los modales
  const [showAdviceModal, setShowAdviceModal] = useState(false);

  // Estado para manejar la asesoria seleccionado para editar
  const [selectedAdvice, setSelectedAdvice] = useState<AdvisorySession>(new AdvisorySession());

  // Estados para controlar el toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger' | 'info' | 'warning'>('info');

  // Estado para controlar si se esta editando
  const [isEditing, setIsEditing] = useState(false);

  // Funciones para mostrar modal
  const handleShowAdviceModal = () => {
    setShowAdviceModal(true);
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
  const handleSaveAdvice = async (advisorySession: AdvisorySession) => {
    setLoadingAdvices(true);
    if (isEditing) {
      try {
        const response = await advisorySessionsService.updateAdvisorySession(advisorySession.Identity, advisorySession);
        if (response) {
          setAdvicesData((prevAdvices) => prevAdvices.map((existingAdvice) => (existingAdvice.Identity === advisorySession.Identity ? advisorySession : existingAdvice)));
          handleToast('Se ha actualizado la asesoría correctamente', 'success', true);
        }
      } catch (error: any) {
        handleToast(error.message, 'warning', true);
      } finally {
        setLoadingAdvices(false);
      }
    } else {
      try {
        const response = await advisorySessionsService.createAdvisorySession(advisorySession);
        if (response) {
          setAdvicesData((prevAdvices) => [...prevAdvices, advisorySession]);
          handleToast('Se ha creado la asesoría correctamente', 'success', true);
        }
      } catch (error: any) {
        handleToast(error.message, 'warning', true);
      } finally {
        setLoadingAdvices(false);
      }
    }
  };

  //Desactivar Asesorías
  const handleToggleActivation = async (identity: number, active: boolean) => {
    try {
      await advisorySessionsService.toggleAdvisorySessionActivation(identity); // Llama al servicio
      setAdvicesData((prevAdvices) => prevAdvices.map((advisorySession) => (advisorySession.Identity === identity ? { ...advisorySession, Active: !active } : advisorySession)));
      handleToast('El estado de la asesoría se actualizó correctamente', 'success', true);
    } catch (error) {
      console.error('Error al cambiar el estado de activación:', error);
      handleToast('Error al cambiar el estado de la asesoría', 'danger', true);
    }
  };

  // Filtrar Registros
  const filteredAdvices = advices;

  // Seleccionar Asesor
  const handleSelectAdvice = (advice: AdvisorySession) => {
    setSelectedAdvice(advice);
    setShowAdviceModal(true);
    setIsEditing(true);
  };

  //Obtener UAs
  const getLearningUnits = async () => {
    try {
      const learningUnitService = new LearningUnitService();
      const units = await learningUnitService.getAllLearningUnits();
      setLearningUnits(units);
    } catch (error) {
      console.error('Error al obtener las materias:', error);
    }
  };

  //Obtener Asesores
  const getAdvisors = async () => {
    try {
      const advisorService = new AdvisorService();
      const allAdvisors = await advisorService.getAllAdvisors();
      const activeAdvisors = allAdvisors.filter((advisor) => advisor.Active);
      setAdvisors(activeAdvisors);
    } catch (error) {
      console.error('Error al obtener los asesores activos:', error);
    }
  };

  //Obtener Asesorados
  const getAdvisees = async () => {
    try {
      const adviseeService = new AdviseeService();
      const allAdvisees = await adviseeService.getAllAdvisees();
      const activeAdvisees = allAdvisees.filter((advisee) => advisee.Active);
      setAdvisees(activeAdvisees);
    } catch (error) {
      console.error('Error al obtener los asesorados activos:', error);
    }
  };

  //Obtener Asesorías
  const getAdvices = async () => {
    setLoadingAdvices(true);
    try {
      const data = await advisorySessionsService.getAllAdvisorySessions();
      console.log(data);
      setAdvicesData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingAdvices(false);
    }
  };

  useEffect(() => {
    getLearningUnits();
    getAdvisors();
    getAdvisees();
    getAdvices();
  }, []);

  return (
    <Container className="mt-4 bg-white" style={{ minHeight: '100vh' }}>
      {/* Encabezado */}
      <Row className="px-2 py-1">
        <Col xs={12} lg={12}>
          <h1 className="fs-3 fw-bold text-start">Asesorías</h1>
        </Col>
      </Row>

      {/* Filtros de búsqueda */}
      <Row className="shadow-sm rounded p-2 my-2">
        <Col xs={12} lg={8} className="d-flex my-2">
          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon1">
              <BsFillFilePersonFill className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Asesorado" aria-label="Asesorado" value={searchAdvisee} onChange={(e) => setSearchAdvisee(e.target.value)} />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon2">
              <BsBook className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Materia" aria-label="Materia" value={searchLearningUnit} onChange={(e) => setSearchLearningUnit(e.target.value)} />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon3">
              <BsPersonWorkspace className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Asesor" aria-label="Asesor" value={searchAdvisor} onChange={(e) => setSearchAdvisor(e.target.value)} />
          </InputGroup>
        </Col>

        <Col xs={12} lg={4} className="d-flex justify-content-end my-2">
          <Button
            className="button d-flex align-items-center justify-content-center me-1"
            onClick={() => {
              setSearchLearningUnit('');
              setSearchAdvisee('');
              setSearchAdvisor('');
            }}>
            <BsXCircleFill className="me-1 fs-5" />
            Limpiar Filtros
          </Button>
        </Col>
      </Row>

      {/* Botón para añadir nueva asesoría y tabla de asesorías */}
      <Row className="shadow-sm rounded overflow-hidden p-2 my-2">
        <Col xs={12} lg={12} className="d-flex justify-content-end my-2">
          <Button className="buttonGreen d-flex align-items-center justify-content-center" variant="success" onClick={handleShowAdviceModal}>
            <BsPlusSquareFill className="me-1 fs-5" /> Nueva
          </Button>
        </Col>
        <Col xs={12} lg={12}>
          <Container>
            {loadingAdvices ? (
              <div className="text-center">
                <Spinner animation="grow" />
                <p>Cargando asesorías...</p>
              </div>
            ) : (
              <AdviceTable DataSource={filteredAdvices} handleEditAdvice={handleSelectAdvice} handleToggleActivation={handleToggleActivation} />
            )}
          </Container>
        </Col>
      </Row>

      <AdviceModal show={showAdviceModal} isEditing={isEditing} setShowAdviceModal={setShowAdviceModal} advice={selectedAdvice} setSelectedAdvice={setSelectedAdvice} handleSaveAdvice={handleSaveAdvice} learningUnits={learningUnits} advisors={advisors} advisees={advisees} />
      <CustomToast show={showToast} message={toastMessage} type={toastType} duration={3000} onClose={() => setShowToast(false)} />
    </Container>
  );
};

export default Advices;
