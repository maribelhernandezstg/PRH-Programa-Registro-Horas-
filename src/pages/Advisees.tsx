import '../App.css';
import { Container, Row, Button, InputGroup, Col, Form, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { BsPersonVcardFill, BsPersonBadgeFill, BsMortarboardFill, BsXCircleFill, BsPersonAdd, BsArrowClockwise } from 'react-icons/bs';

import CustomToast from '../components/Toast/Toast';

import AdviseeTable from '../components/Tables/AdviseeTable';
import AdviseeModal from '../components/Modals/AdviseeModal';

import { AdviseeService } from '../services/advisee-service';
import { Advisee } from '../shared/models/advisee.class';

import { DegreeService } from '../services/degree-service';
import { Degree } from '../shared/models/degree.class';

const Advisees = () => {
  //Instancia de mi servicio
  const adviseeService = new AdviseeService();
  const degreeService = new DegreeService();

  // Estados para manejar los filtros de búsqueda
  const [searchName, setSearchName] = useState('');
  const [searchStudentId, setSearchStudentId] = useState('');
  const [searchCareer, setSearchCareer] = useState('');

  // Estado para manejar el loader
  const [loadingAdvisees, setLoadingAdvisees] = useState(true);

  // Estado para almacenar los asesorados
  const [advisees, setAdviseesData] = useState<Advisee[]>([]);

  // Estado para almacenar las carreras
  const [degrees, setDegresData] = useState<Degree[]>([]);

  // Estado para almacenar el asesorado seleccionado
  const [selectedAdvisee, setSelectedAdvisee] = useState<Advisee>(new Advisee());

  // Estados para controlar el toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger' | 'info' | 'warning'>('info');

  // Estado para controlar la visibilidad del modal
  const [showAdviseeModal, setShowAdviseeModal] = useState(false);

  // Estado para controlar si se esta editando
  const [isEditing, setIsEditing] = useState(false);

  // Funciones para mostrar modal
  const handleShowAdviseeModal = () => {
    setShowAdviseeModal(true);
    setIsEditing(false);
  };

  // Estado para controlar el toast
  type ToastType = 'success' | 'danger' | 'info' | 'warning';
  const handleToast = (message: string, type: ToastType, show: boolean) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(show);
  };

  // Estado guardar/actualizar el asesorado
  const handleSaveAdvisee = async (advisee: Advisee) => {
    setLoadingAdvisees(true);
    if (isEditing) {
      try {
        const response = await adviseeService.updateAdvisee(advisee.Enrollment, advisee);
        if (response) {
          setAdviseesData((prevAdvisees) => prevAdvisees.map((existingAdvisee) => (existingAdvisee.Enrollment === advisee.Enrollment ? advisee : existingAdvisee)));
          handleToast('Se ha actualizado el asesorado correctamente', 'success', true);
        }
      } catch (error: any) {
        handleToast(error.message, 'warning', true);
      } finally {
        setLoadingAdvisees(false);
      }
    } else {
      try {
        const response = await adviseeService.createAdvisee(advisee);
        if (response) {
          setAdviseesData((prevAdvisees) => [...prevAdvisees, advisee]);
          handleToast('Se ha creado el asesorado correctamente', 'success', true);
        }
      } catch (error: any) {
        handleToast(error.message, 'warning', true);
      } finally {
        setLoadingAdvisees(false);
      }
    }
  };

  // Filtrar Registros
  const filteredAdvisees = advisees.filter((register) => register.Name.toLowerCase().includes(searchName.toLowerCase()) && register.Enrollment.toString().includes(searchStudentId.toLowerCase()) && register.DegreeIdentity.toString().includes(searchCareer.toLowerCase()));

  // Función para manejar el cambio de carrera en el dropdown
  const handleCareerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCareer(event.target.value);
  };

  // Seleccionar Asesorado
  const handleSelectAdvisee = (advisee: Advisee) => {
    setSelectedAdvisee(advisee);
    setShowAdviseeModal(true);
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

  //Obtener Asesorados
  const getAdvisees = async () => {
    setLoadingAdvisees(true);
    try {
      const data = await adviseeService.getAllAdvisees();
      setAdviseesData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingAdvisees(false);
    }
  };

  useEffect(() => {
    const fetchAdvices = async () => {
      getAdvisees();
      getDegrees();
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
          <Button className="button d-flex align-items-center justify-content-center" variant="success" onClick={getAdvisees}>
            <BsArrowClockwise className=" fs-5" />
          </Button>
          <Button className="buttonGreen d-flex align-items-center justify-content-center" variant="success" onClick={handleShowAdviseeModal}>
            <BsPersonAdd className="me-1 fs-5" /> Agregar
          </Button>
        </Col>
        <Col xs={12} lg={12}>
          <Container>
            {loadingAdvisees ? (
              <div className="text-center">
                <Spinner animation="grow" />
                <p>Cargando asesorados...</p>
              </div>
            ) : (
              <AdviseeTable DataSource={filteredAdvisees} handleEditAdvisee={handleSelectAdvisee} />
            )}
          </Container>
        </Col>
      </Row>
      <AdviseeModal show={showAdviseeModal} isEditing={isEditing} setShowAdviseeModal={setShowAdviseeModal} advisee={selectedAdvisee} setSelectedAdvisee={setSelectedAdvisee} handleSaveAdvisee={handleSaveAdvisee} />
      <CustomToast show={showToast} message={toastMessage} type={toastType} duration={3000} onClose={() => setShowToast(false)} />
    </Container>
  );
};

export default Advisees;
