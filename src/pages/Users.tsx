import '../App.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, Form, Spinner } from 'react-bootstrap';
import { BsPersonVcardFill, BsXCircleFill, BsPersonBadgeFill, BsPersonAdd, BsSearch } from 'react-icons/bs';

import UserTable from '../components/Tables/UserTable';
import UserModal from '../components/Modals/UserModal';
import '../components/tables/Styles.css';
import { UserService } from '../services/user-service';
import { User } from '../shared/models/user.class';

const Users = () => {
  //Instancia de mi servicio
  const userService = new UserService();

  // Estados para manejar los filtros de búsqueda
  const [searchName, setSearchName] = useState('');
  const [searchUserId, setSearchUserId] = useState('');

  // Estado para manejar el loader
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Estado para almacenar los usuarios
  const [users, setUsersData] = useState<User[]>([]);

  // Estado para controlar el estado de los usuarios
  const toggleUserStatus = (enrollment: number) => {
    setUsersData((prev) => prev.map((registro) => (registro.Enrollment === enrollment ? { ...registro, Active: !registro.Active } : registro)));
  };

  // Estado para controlar la visibilidad del modal
  const [showUserModal, setShowUserModal] = useState(false);

  // Valor inicial para un nuevo usuario
  const initialUser: User = {
    Enrollment: 0,
    Name: '',
    Password: '',
    Type: 0,
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: false,
  };

  // Funciones para mostrar y cerrar el modal
  const handleShowUserModal = () => setShowUserModal(true);
  const handleCloseUserModal = () => {
    setShowUserModal(false);
    setNewUser(initialUser); // Reiniciar al cerrar
    setEditUser(initialUser); // Reiniciar el usuario editado
  };

  // Estado para manejar una nuevo usuario, editar usuario y errores
  const [newUser, setNewUser] = useState<User>(initialUser);
  const [editUser, setEditUser] = useState<User>(initialUser);
  const [errors, setErrors] = useState({ Name: '', Enrollment: '' });

  // Manejar el cambio en el formulario del modal
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditUser = (usuario: { Name: string; Enrollment: number; Active: boolean }) => {
    const updatedUser: User = {
      ...editUser,
      Name: usuario.Name,
      Enrollment: usuario.Enrollment,
      Active: usuario.Active,
      UpdatedAt: new Date(),
    };
    setEditUser(updatedUser);
    setNewUser(updatedUser); // Esto debería cargar la información en el formulario
    handleShowUserModal(); // Mostrar el modal
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
      setUsersData((prev) => prev.map((registro) => (registro.Enrollment === editUser.Enrollment ? newUser : registro)));
    } else {
      setUsersData((prev) => [...prev, newUser]);
    }

    handleCloseUserModal();
  };
  // Filtrar registros
  const filteredRegistros = users.filter((registro) => registro.Name.toLowerCase().includes(searchName.toLowerCase()) && registro.Enrollment.toString().includes(searchUserId.toLowerCase()));

  // Cargar las asesorías al montar el componente
  useEffect(() => {
    const fetchAdvices = async () => {
      setLoadingUsers(true);
      try {
        const data = await userService.getAllUsersDummy();
        setUsersData(data);
      } catch (error) {
        console.error('Error fetching data:', error); // Manejo de errores
      } finally {
        setLoadingUsers(false); // Finaliza la carga
      }
    };

    fetchAdvices();
  }, []);

  return (
    <Container className="mt-4 bg-white" style={{ minHeight: '100vh' }}>
      <UserModal show={showUserModal} handleClose={handleCloseUserModal} handleSaveChanges={handleSaveChanges} user={newUser} handleInputChange={handleInputChange} errors={errors} />

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
          <Button className="buttonGreen d-flex align-items-center justify-content-center" variant="success" onClick={handleShowUserModal}>
            <BsPersonAdd className="me-1 fs-5" /> Agregar
          </Button>
        </Col>
        <Col xs={12} lg={12}>
          <Container>
            {loadingUsers ? (
              // Loader mientras se cargan los usuarios
              <div className="text-center">
                <Spinner animation="grow" />
                <p>Cargando usuarios...</p>
              </div>
            ) : (
              // Tabla de usuarios filtrados
              <UserTable DataSource={filteredRegistros} toggleUserStatus={toggleUserStatus} handleEditUser={handleEditUser} />
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
