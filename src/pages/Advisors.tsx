import '../App.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, Form, Spinner } from 'react-bootstrap';
import { BsArrowDownUp, BsXCircleFill, BsPersonVcardFill, BsPersonBadgeFill, BsMortarboardFill, BsPersonAdd, BsSearch } from 'react-icons/bs';

import AdvisorTable from '../components/Tables/AdvisorTable';
import ClockInModal from '../components/Modals/AdvisorClockIn';
import AdvisorModal from '../components/Modals/AdvisorModal';

import { AdvisorService } from '../services/advisor-service';
import { Advisor } from '../shared/models/advisor.class';
import { AdvisorErrors } from '../shared/forms-errors/advisor-error.class';

// Definición de un tipo simplificado
interface SimplifiedAdvisor {
  Name: string;
  Enrollment: number;
  Gender: string;
  DegreeIdentity: string;
}

const Advisors = () => {
  //Instancia de mi servicio
  const advisorService = new AdvisorService();

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

  // Estado para manejar el asesor seleccionado para editar
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);

  // Estado para manejar un nuevo asesor y errores
  const [newAdvisor, setNewAdvisor] = useState<Advisor>(new Advisor());
  const [errors, setErrors] = useState<AdvisorErrors>(new AdvisorErrors());

  // Funciones para mostrar y cerrar los modales
  const handleShowClockInModal = () => setShowClockInModal(true);
  const handleCloseClockInModal = () => setShowClockInModal(false);
  const handleShowAdvisorModal = () => setShowAdvisorModal(true);
  const handleCloseAdvisorModal = () => {
    setShowAdvisorModal(false);
    setSelectedAdvisor(null);
    setNewAdvisor(new Advisor());
    setErrors(new AdvisorErrors());
  };

  // Función para manejar la edición de un asesor
  const handleEditAdvisor = (advisor: SimplifiedAdvisor) => {
    // Crear un objeto `Advisor` completo usando el tipo simplificado
    const fullAdvisor: Advisor = {
      ...advisor,
    };

    setSelectedAdvisor(fullAdvisor);
    setNewAdvisor({ ...fullAdvisor });
    handleShowAdvisorModal();
  };

  // Maneja la acción de guardar los cambios de la nueva asesoría
  const handleSaveChanges = () => {
    const newErrors = new AdvisorErrors(!newAdvisor.Enrollment ? 'Campo requerido' : '', !newAdvisor.Gender ? 'Campo requerido' : '', !newAdvisor.Name ? 'Campo requerido' : '', !newAdvisor.DegreeIdentity ? 'Campo requerido' : '');

    setErrors(newErrors);

    // Si no hay errores, guarda el nuevo asesor o actualiza el existente
    if (Object.values(newErrors).every((error) => error === '')) {
      if (selectedAdvisor) {
        const updatedAdvisors = advisors.map((advisor) => (advisor.Enrollment === selectedAdvisor.Enrollment ? newAdvisor : advisor));
        setAdvisorsData(updatedAdvisors);
      } else {
        setAdvisorsData([...advisors, newAdvisor]);
      }
      handleCloseAdvisorModal();
    }
  };

  // Maneja los cambios en los campos de entrada del nuevo asesorado
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewAdvisor({ ...newAdvisor, [name]: value });
  };

  // Filtra y mapea los asesores para `AdvisorTable`
  const filteredAdvisors: SimplifiedAdvisor[] = advisors
    .filter((advisor) => {
      const regexName = new RegExp(searchName, 'i');
      const regexStudentId = new RegExp(searchStudentId, 'i');
      const regexCareer = new RegExp(searchCareer, 'i');

      return (!searchName || regexName.test(advisor.Name)) && (!searchStudentId || regexStudentId.test(advisor.Enrollment.toString())) && (!searchCareer || regexCareer.test(advisor.DegreeIdentity));
    })
    .map((advisor) => ({
      Name: advisor.Name,
      Enrollment: advisor.Enrollment,
      Gender: advisor.Gender,
      DegreeIdentity: advisor.DegreeIdentity,
    }));

  // Efecto para cargar los asesores al montar el componente
  useEffect(() => {
    const fetchAdvisors = async () => {
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
              <div className="text-center">
                <Spinner animation="grow" />
                <p>Cargando asesores...</p>
              </div>
            ) : (
              <AdvisorTable DataSource={filteredAdvisors} onEdit={handleEditAdvisor} />
            )}
          </Container>
        </Col>
      </Row>
      <ClockInModal show={showClockInModal} handleClose={handleCloseClockInModal} />
      <AdvisorModal show={showAdvisorModal} handleClose={handleCloseAdvisorModal} handleSaveChanges={handleSaveChanges} advisor={newAdvisor} handleInputChange={handleInputChange} errors={errors} mode={selectedAdvisor ? 'Editar' : 'Agregar'} />
    </Container>
  );
};

export default Advisors;
