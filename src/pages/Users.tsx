import '../App.css';
import { useState } from 'react';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { BsPersonVcardFill, BsXCircleFill, BsPersonBadgeFill, BsPersonAdd, BsSearch } from 'react-icons/bs';

import UserTable from '../components/Tables/UserTable';
import UserModal from '../components/Modals/UserModal';
import '../components/tables/Styles.css';

const Users = () => {
  // Estados para los filtros
  const [searchName, setSearchName] = useState('');
  const [searchUserId, setSearchUserId] = useState('');

  const toggleUserStatus = (enrollment: string) => {
    setRegistrosUsuarios((prev) => prev.map((registro) => (registro.Enrollment === enrollment ? { ...registro, Active: !registro.Active } : registro)));
  };

  // Datos de usuarios (dummy)
  const [registrosUsuarios, setRegistrosUsuarios] = useState([
    { Name: 'Edson Eduardo', Enrollment: '197215', Active: true },
    { Name: 'Kevin Sanchez', Enrollment: '121212', Active: true },
    { Name: 'María López', Enrollment: '201234', Active: true },
    { Name: 'Juan Pérez', Enrollment: '198765', Active: true },
    { Name: 'Claudia Fernández', Enrollment: '202345', Active: false },
    { Name: 'Luis Torres', Enrollment: '199876', Active: true },
    { Name: 'Ana Martínez', Enrollment: '207654', Active: false },
    { Name: 'Daniel Ramirez', Enrollment: '210987', Active: false },
    { Name: 'Sofia González', Enrollment: '215432', Active: true },
    { Name: 'Pedro Hernández', Enrollment: '205678', Active: true },
    { Name: 'Laura Silva', Enrollment: '218765', Active: false },
  ]);

  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState({
    Name: '',
    Enrollment: '',
    Active: true,
  });

  const [editUser, setEditUser] = useState<{ Name: string; Enrollment: string; Active: boolean } | null>(null);

  const [errors, setErrors] = useState({ Name: '', Enrollment: '' });

  // Manejar el cambio en el formulario del modal
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditUser = (usuario: { Name: string; Enrollment: string; Active: boolean }) => {
    setEditUser(usuario);
    setNewUser(usuario); // Esto debería cargar la información en el formulario
    handleShow(); // Mostrar el modal
  };

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setNewUser({ Name: '', Enrollment: '', Active: true }); // Reiniciar al cerrar
    setEditUser(null); // Reiniciar el usuario editado
  };

  const handleSaveChanges = () => {
    const { Name, Enrollment } = newUser;
    const validationErrors = { Name: '', Enrollment: '' };

    if (!Name) validationErrors.Name = 'Este campo es obligatorio';
    if (!Enrollment) validationErrors.Enrollment = 'Este campo es obligatorio';

    if (validationErrors.Name || validationErrors.Enrollment) {
      setErrors(validationErrors);
      return;
    }

    if (editUser) {
      setRegistrosUsuarios((prev) => prev.map((registro) => (registro.Enrollment === editUser.Enrollment ? newUser : registro)));
    } else {
      setRegistrosUsuarios((prev) => [...prev, newUser]);
    }

    handleClose();
  };
  // Filtrar registros
  const filteredRegistros = registrosUsuarios.filter((registro) => registro.Name.toLowerCase().includes(searchName.toLowerCase()) && registro.Enrollment.toLowerCase().includes(searchUserId.toLowerCase()));

  return (
    <Container className="mt-4 bg-white" style={{ minHeight: '100vh' }}>
      <UserModal show={show} handleClose={handleClose} handleSaveChanges={handleSaveChanges} user={newUser} handleInputChange={handleInputChange} errors={errors} />

      <Row className="px-2 py-1">
        <Col xs={10} lg={8}>
          <h1 className="fs-3 fw-bold text-start">Usuarios</h1>
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
            <Form.Control placeholder="Matrícula" aria-label="Matrícula" value={searchUserId} onChange={(e) => setSearchUserId(e.target.value)} aria-describedby="basic-addon2" />
          </InputGroup>
        </Col>
        <Col xs={12} lg={4} className="d-flex justify-content-end my-2">
          <Button className="button d-flex align-items-center justify-content-center me-1">
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
          <Button className="buttonGreen d-flex align-items-center justify-content-center" variant="success" onClick={handleShow}>
            <BsPersonAdd className="me-1 fs-5" /> Agregar
          </Button>
        </Col>
        <Col xs={12} lg={12}>
          <div className="table-container">
            <UserTable DataSource={filteredRegistros} toggleUserStatus={toggleUserStatus} handleEditUser={handleEditUser} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
