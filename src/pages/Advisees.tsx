import '../App.css';
import { Container, Row, Button, InputGroup, Col, Form, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { BsPersonVcardFill, BsPersonBadgeFill, BsMortarboardFill, BsXCircleFill, BsPersonAdd, BsSearch } from 'react-icons/bs';

import AdviseeTable from '../components/Tables/AdviseeTable';
import AdviseeModal from '../components/Modals/AdviseeModal';

import { getAllAdviseesDummy } from '../services/advisee-service';

import { Advisee } from '../shared/models/advisee.class';
import { AdviseeErrors } from '../shared/forms-errors/advisee-error.class';

const Advisees = () => {
  // Estados para manejar los filtros de búsqueda
  const [searchName, setSearchName] = useState('');
  const [searchStudentId, setSearchStudentId] = useState('');
  const [searchCareer, setSearchCareer] = useState('');

  // Estado para manejar el loader
  const [loadingAdvisees, setLoadingAdvisees] = useState(true);

  // Estado para almacenar los asesores
  const [advisees, setAdviseesData] = useState<Advisee[]>([]);

  // Estado para controlar la visibilidad del modal
  const [showAdviseeModal, setShowAdviseeModal] = useState(false);

  // Funciones para mostrar y cerrar el modal
  const handleShowAdviseeModal = () => setShowAdviseeModal(true);
  const handleCloseAdviseeModal = () => setShowAdviseeModal(false);

  // Estado para manejar una nuevo asesorado y errores
  const [newAdvisee, setNewAdvisee] = useState<Advisee>(new Advisee());
  const [errors, setErrors] = useState<AdviseeErrors>(new AdviseeErrors());

  // Maneja la acción de guardar los cambios de la nueva asesoría
  const handleSaveChanges = () => {
    // Valida los campos y establece errores si es necesario
    const newErrors = new AdviseeErrors(!newAdvisee.Enrollment ? 'Campo requerido' : '', !newAdvisee.Gender ? 'Campo requerido' : '', !newAdvisee.Name ? 'Campo requerido' : '', !newAdvisee.DegreeIdentity ? 'Campo requerido' : '');

    setErrors(newErrors);

    // Si no hay errores, guarda el nuevo asesorado
    if (Object.values(newErrors).every((error) => error === '')) {
      // Actualiza el estado de asesorados y cierra el modal
      setAdviseesData([...advisees, newAdvisee]);
      setNewAdvisee(new Advisee());
      handleCloseAdviseeModal();
    }
  };

  // Maneja los cambios en los campos de entrada del nuevo asesorado
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewAdvisee({ ...newAdvisee, [name]: value });
  };

  // Filtra las asesorados según los criterios de búsqueda
  const filteredAdvisees = advisees.filter((advisee) => {
    const regexName = new RegExp(searchName, 'i');
    const regexStudentId = new RegExp(searchStudentId, 'i');
    const regexCareer = new RegExp(searchCareer, 'i');

    return (!searchName || regexName.test(advisee.Name)) && (!searchStudentId || regexStudentId.test(advisee.Enrollment.toString())) && (!searchCareer || regexCareer.test(advisee.DegreeIdentity));
  });

  // Efecto para cargar los asesorados al montar el componente
  useEffect(() => {
    const fetchAdvices = async () => {
      setLoadingAdvisees(true);
      try {
        const data = await getAllAdviseesDummy(); // Obtiene los asesorados
        setAdviseesData(data);
      } catch (error) {
        console.error('Error fetching data:', error); // Manejo de errores
      } finally {
        setLoadingAdvisees(false); // Finaliza la carga
      }
    };

    fetchAdvices();
  }, []);

  return (
    <Container className="mt-4 bg-white" style={{ minHeight: '100vh' }}>
      <Row className="px-2 py-1">
        <Col xs={12} lg={12}>
          <h1 className="fs-3 fw-bold text-start">Asesorados</h1>
        </Col>
      </Row>
      <Row className="shadow-sm rounded p-2 my-2">
        <Col xs={12} lg={8} className="d-flex my-2">
          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon1">
              <BsPersonVcardFill className="fs-5" />
            </InputGroup.Text>
            <Form.Control placeholder="Nombre(s)" aria-label="Nombre(s)" value={searchName} onChange={(e) => setSearchName(e.target.value)} aria-describedby="basic-addon1" />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon2">
              <BsPersonBadgeFill className="fs-5" />
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
          <Button className="buttonGreen d-flex align-items-center justify-content-center" variant="success" onClick={handleShowAdviseeModal}>
            <BsPersonAdd className="me-1 fs-5" /> Agregar
          </Button>
        </Col>
        <Col xs={12} lg={12}>
          <Container>
            {loadingAdvisees ? (
              // Loader mientras se cargan las asesorías
              <div className="text-center">
                <Spinner animation="grow" />
                <p>Cargando asesorados...</p>
              </div>
            ) : (
              // Tabla de asesorados filtrados
              <AdviseeTable DataSource={filteredAdvisees} />
            )}
          </Container>
        </Col>
      </Row>
      <AdviseeModal show={showAdviseeModal} handleClose={handleCloseAdviseeModal} handleSaveChanges={handleSaveChanges} advisee={newAdvisee} handleInputChange={handleInputChange} errors={errors} />
    </Container>
  );
};

export default Advisees;
