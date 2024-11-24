import '../App.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, Form, Spinner } from 'react-bootstrap';
import { BsFillFilePersonFill, BsBook, BsPersonWorkspace, BsPlusSquareFill, BsSearch, BsXCircleFill } from 'react-icons/bs';

import AdviceTable from '../components/Tables/AdviceTable'; // Componente para mostrar la tabla de asesorías
import AdviceModal from '../components/Modals/AdvisorySessionModal'; // Componente modal para añadir/editar asesorías

import { AdvisorySessionService } from '../services/advisory-session-service';
import { AdvisorySession } from '../shared/models/advisory-session.class'; // Interfaz para el modelo de sesión de asesoría
import { AdvisorySessionErrors } from '../shared/forms-errors/advisory-session-error.class';

import { LearningUnitService } from '../services/learning-units-service';
import { LearningUnit } from '../shared/models/learning-unit.class';

import { Advisor } from '../shared/models/advisor.class';
import { AdvisorService } from '../services/advisor-service';

import { Advisee } from '../shared/models/advisee.class';
import { AdviseeService } from '../services/advisee-service';

interface SimplifiedAdvice {
  AdvisorIdentity: string;
  AdviseeIdentity: string;
  AdviseeStudentId: string;
  LearningUnitIdentity: string;
  Topic: string;
  StartTime: Date;
  EndTime: Date;
}

const Advices = () => {
  //Instancia de mi servicio
  const advisorySessionsService = new AdvisorySessionService();
  const [advisors, setAdvisors] = useState<Advisor[]>([]); // Estado para los asesores activos

  const [learningUnits, setLearningUnits] = useState<LearningUnit[]>([]);

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

  // Estado para manejar la sesión de asesoría seleccionada y el modo de edición
  const [selectedAdvice, setSelectedAdvice] = useState<AdvisorySession | null>(null);

  // Valor inicial para una nueva sesión de asesoría y errores
  const initialAdvice = new AdvisorySession();
  const initialErrors = new AdvisorySessionErrors();

  // Estado para manejar una nueva asesoría y errores
  const [newAdvice, setNewAdvice] = useState<AdvisorySession>(initialAdvice);
  const [errors, setErrors] = useState<AdvisorySessionErrors>(initialErrors);

  // Funciones para mostrar y cerrar el modal
  const handleShowAdviceModal = () => setShowAdviceModal(true);
  const handleCloseAdviceModal = () => {
    setShowAdviceModal(false);
    setSelectedAdvice(null);
    setNewAdvice(new AdvisorySession());
    setErrors(new AdvisorySessionErrors());
  };

  // Maneja la acción de editar una asesoría
  const handleEditAdvice = (advice: SimplifiedAdvice) => {
    // Crear un objeto completo de `AdvisorySession` usando el tipo simplificado
    const fullAdvice: AdvisorySession = {
      ...advice,
      SessionDate: selectedAdvice?.SessionDate || new Date(),
      Identity: selectedAdvice?.Identity ?? 0,
      Professor: selectedAdvice?.Professor || '',
      ClassType: selectedAdvice?.ClassType || '',
      UserCreation: selectedAdvice?.UserCreation || 0,
      CreatedAt: selectedAdvice?.CreatedAt || new Date(),
      UserUpdate: selectedAdvice?.UserUpdate || 0,
      UpdatedAt: selectedAdvice?.UpdatedAt || new Date(),
      Active: selectedAdvice?.Active || true,
    };

    setSelectedAdvice(fullAdvice);
    setNewAdvice({ ...fullAdvice });
    handleShowAdviceModal();
  };

  // Maneja la acción de guardar los cambios de la nueva asesoría
  const handleSaveChanges = () => {
    // Valida los campos y establece errores si es necesario
    const newErrors = {
      AdvisorIdentity: newAdvice.AdvisorIdentity ? '' : 'Campo requerido',
      AdviseeIdentity: newAdvice.AdviseeIdentity ? '' : 'Campo requerido',
      AdviseeStudentId: newAdvice.AdviseeStudentId ? '' : 'Campo requerido',
      LearningUnitIdentity: newAdvice.LearningUnitIdentity ? '' : 'Campo requerido',
      Topic: newAdvice.Topic ? '' : 'Campo requerido',
    };
    setErrors(newErrors);

    // Si no hay errores, guarda la nueva asesoría
    if (Object.values(newErrors).every((error) => error === '')) {
      if (selectedAdvice) {
        const updatedAdvices = advices.map((advice) => (advice.AdviseeStudentId === selectedAdvice.AdviseeStudentId ? newAdvice : advice));
        setAdvicesData(updatedAdvices);
      } else {
        setAdvicesData([...advices, newAdvice]);
      }
      handleCloseAdviceModal();
    }
  };

  // Maneja los cambios en los campos de entrada de la nueva asesoría
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewAdvice({ ...newAdvice, [name]: value });
  };

  // Filtra las asesorías según los criterios de búsqueda
  const filteredAdvices: SimplifiedAdvice[] = advices
    .filter((advice) => {
      const regexAdvisee = new RegExp(searchAdvisee, 'i');
      const regexLearningUnit = new RegExp(searchLearningUnit, 'i');
      const regexAdvisor = new RegExp(searchAdvisor, 'i');
      return (!searchAdvisee || regexAdvisee.test(advice.AdviseeIdentity)) && (!searchLearningUnit || regexLearningUnit.test(advice.LearningUnitIdentity)) && (!searchAdvisor || regexAdvisor.test(advice.AdvisorIdentity));
    })
    .map((advice) => ({
      AdvisorIdentity: advice.AdvisorIdentity,
      AdviseeIdentity: advice.AdviseeIdentity,
      AdviseeStudentId: advice.AdviseeStudentId,
      LearningUnitIdentity: advice.LearningUnitIdentity,
      Topic: advice.Topic,
      StartTime: advice.StartTime,
      EndTime: advice.EndTime,
    }));

  // Efecto para cargar las asesorías al montar el componente
  /*
  useEffect(() => {
    const fetchAdvices = async () => {
      setLoadingAdvices(true);
      try {
        const data = await advisorySessionsService.getAllAdvisorySessionsDummy(); // Obtiene las sesiones de asesoría
        setAdvicesData(data);
      } catch (error) {
        console.error('Error fetching data:', error); // Manejo de errores
      } finally {
        setLoadingAdvices(false); // Finaliza la carga
      }
    };

    fetchAdvices();
  }, []);
  Comentar el viejo dummys
  */

  
// Cargar materias,asesores al montar el componente
useEffect(() => {
  const fetchLearningUnits = async () => {
    try {
      const learningUnitService = new LearningUnitService(); 
      const units = await learningUnitService.getAllLearningUnits();
      setLearningUnits(units); 
      console.log('Learning Units obtenidas:', units); 
    } catch (error) {
      console.error('Error al obtener las materias:', error);
    }
  };

  const fetchActiveAdvisors = async () => {
    try {
      const advisorService = new AdvisorService();
      const allAdvisors = await advisorService.getAllAdvisors();
      const activeAdvisors = allAdvisors.filter((advisor) => advisor.Active); // Filtrar solo asesores activos
      setAdvisors(activeAdvisors);
      console.log('Active advisors:', activeAdvisors); // Valida que los datos lleguen correctamente
    } catch (error) {
      console.error('Error al obtener los asesores activos:', error);
    }
  };

  fetchLearningUnits();
  fetchActiveAdvisors();
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
              <AdviceTable DataSource={filteredAdvices} onEdit={handleEditAdvice} />
            )}
          </Container>
        </Col>
      </Row>

      {/* Modal para añadir/editar asesorías */}
      <AdviceModal show={showAdviceModal} handleClose={handleCloseAdviceModal} handleSaveChanges={handleSaveChanges} advice={newAdvice} handleInputChange={handleInputChange} errors={errors} mode={selectedAdvice ? 'Editar' : 'Agregar'}  learningUnits={learningUnits} advisors={advisors}/>
    </Container>
  );
};

export default Advices;
