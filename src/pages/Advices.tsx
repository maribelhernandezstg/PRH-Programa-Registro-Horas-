import '../App.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, Form, Spinner } from 'react-bootstrap';
import { BsFillFilePersonFill, BsBook, BsPersonWorkspace, BsPlusSquareFill, BsSearch, BsXCircleFill } from 'react-icons/bs';

import AdviceTable from '../components/Tables/AdviceTable'; // Componente para mostrar la tabla de asesorías
import AdviceModal from '../components/Modals/AdviceModal'; // Componente modal para añadir/editar asesorías

import { getAllAdvisorySessionsDummy } from '../services/advisory-session-service'; // Servicios de las asesorias
import { AdvisorySession } from '../shared/models/advisory-session.interface'; // Interfaz para el modelo de sesión de asesoría

const Advices = () => {
  // Estados para manejar los filtros de búsqueda
  const [searchAdvisee, setSearchAdvisee] = useState('');
  const [searchLearningUnit, setSearchLearningUnit] = useState('');
  const [searchAdvisor, setSearchAdvisor] = useState('');

  // Estado para manejar el loader
  const [loadingAdvices, setLoadingAdvices] = useState(true);

  // Estado para almacenar las asesorías
  const [advices, setAdvicesData] = useState<AdvisorySession[]>([]);

  // Estado para controlar la visibilidad del modal
  const [showAdviceModal, setShowAdviceModal] = useState(false);

  // Funciones para mostrar y cerrar el modal
  const handleShowAdviceModal = () => setShowAdviceModal(true);
  const handleCloseAdviceModal = () => setShowAdviceModal(false);

  // Valor inicial para una nueva sesión de asesoría
  const initialAdvice: AdvisorySession = {
    Identity: 0,
    LearningUnitIdentity: '',
    Topic: '',
    Professor: '',
    ClassType: '',
    AdvisorIdentity: '',
    AdviseeStudentId: '',
    AdviseeIdentity: '',
    SessionDate: new Date(),
    StartTime: new Date(),
    EndTime: new Date(),
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: false,
  };

  // Estado para manejar una nueva asesoría y errores
  const [newAdvice, setNewAdvice] = useState<AdvisorySession>(initialAdvice);
  const [errors, setErrors] = useState<AdvisorySession>(initialAdvice);

  // Filtra las asesorías según los criterios de búsqueda
  const filteredAdvices = advices.filter((advice) => {
    const regexAdvisee = new RegExp(searchAdvisee, 'i');
    const regexLearningUnit = new RegExp(searchLearningUnit, 'i');
    const regexAdvisor = new RegExp(searchAdvisor, 'i');
    return (!searchAdvisee || regexAdvisee.test(advice.AdviseeIdentity)) && (!searchLearningUnit || regexLearningUnit.test(advice.LearningUnitIdentity)) && (!searchAdvisor || regexAdvisor.test(advice.AdvisorIdentity));
  });

  // Maneja los cambios en los campos de entrada de la nueva asesoría
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewAdvice({ ...newAdvice, [name]: value });
  };

  // Maneja la acción de guardar los cambios de la nueva asesoría
  const handleSaveChanges = () => {
    // Valida los campos y establece errores si es necesario
    const newErrors = {
      ...newAdvice,
      AdvisorIdentity: newAdvice.AdvisorIdentity ? '' : 'Campo requerido',
      AdviseeIdentity: newAdvice.AdviseeIdentity ? '' : 'Campo requerido',
      AdviseeStudentId: newAdvice.AdviseeStudentId ? '' : 'Campo requerido',
      LearningUnitIdentity: newAdvice.LearningUnitIdentity ? '' : 'Campo requerido',
      Topic: newAdvice.Topic ? '' : 'Campo requerido',
    };
    setErrors(newErrors);

    // Si no hay errores, guarda la nueva asesoría
    if (Object.values(newErrors).every((error) => error === '')) {
      const advisorySession: AdvisorySession = {
        ...newAdvice,
        SessionDate: new Date(),
      };

      // Actualiza el estado de asesorías y cierra el modal
      setAdvicesData([...advices, advisorySession]);
      setNewAdvice(initialAdvice);
      handleCloseAdviceModal();
    }
  };

  // Efecto para cargar las asesorías al montar el componente
  useEffect(() => {
    const fetchAdvices = async () => {
      setLoadingAdvices(true);
      try {
        const data = await getAllAdvisorySessionsDummy(); // Obtiene las sesiones de asesoría
        setAdvicesData(data);
      } catch (error) {
        console.error('Error fetching data:', error); // Manejo de errores
      } finally {
        setLoadingAdvices(false); // Finaliza la carga
      }
    };

    fetchAdvices();
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
            <Form.Control placeholder="Asesorado" aria-label="Asesorado" value={searchAdvisee} aria-describedby="basic-addon1" onChange={(e) => setSearchAdvisee(e.target.value)} />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon2">
              <BsBook className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Materia" aria-label="Materia" value={searchLearningUnit} aria-describedby="basic-addon2" onChange={(e) => setSearchLearningUnit(e.target.value)} />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon3">
              <BsPersonWorkspace className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Asesor" aria-label="Asesor" value={searchAdvisor} aria-describedby="basic-addon3" onChange={(e) => setSearchAdvisor(e.target.value)} />
          </InputGroup>
        </Col>

        {/* Botones de limpiar y buscar */}
        <Col xs={12} lg={4} className="d-flex justify-content-end my-2">
          <Button
            className="button d-flex align-items-center justify-content-center me-1"
            onClick={() => {
              // Limpia los filtros
              setSearchAdvisee('');
              setSearchLearningUnit('');
              setSearchAdvisor('');
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
              // Loader mientras se cargan las asesorías
              <div className="text-center">
                <Spinner animation="grow" />
                <p>Cargando asesorías...</p>
              </div>
            ) : (
              // Tabla de asesorías filtradas
              <AdviceTable DataSource={filteredAdvices} />
            )}
          </Container>
        </Col>
      </Row>

      {/* Modal para añadir/editar asesorías */}
      <AdviceModal show={showAdviceModal} handleClose={handleCloseAdviceModal} handleSaveChanges={handleSaveChanges} advice={newAdvice} handleInputChange={handleInputChange} errors={errors} />
    </Container>
  );
};

export default Advices;
