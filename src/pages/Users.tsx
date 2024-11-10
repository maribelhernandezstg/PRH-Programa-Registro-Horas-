import '../App.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, Form, Spinner } from 'react-bootstrap';
import { BsPersonVcardFill, BsXCircleFill, BsPersonBadgeFill, BsPersonAdd, BsPeopleFill, BsArrowClockwise } from 'react-icons/bs';

import CustomToast from '../components/Toast/Toast';

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
  const [searchType, setSearchType] = useState('');

  const typeOptions = [
    { value: '', label: 'Tipo' },
    { value: '1', label: 'Admin' },
    { value: '2', label: 'Recepción' },
    { value: '3', label: 'Asesor' },
  ];

  // Función para manejar el cambio de tipo en el dropdown
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value);
  };

  // Estado para manejar el loader
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Estado para almacenar los usuarios
  const [users, setUsersData] = useState<User[]>([]);

  // Estado para almacenar el usuario seleccionado
  const [selectedUser, setSelectedUserData] = useState<User>(new User());

  // Estado para controlar el estado de los usuarios
  const toggleUserStatus = (enrollment: number) => {
    setUsersData((prev) => prev.map((register) => (register.Enrollment === enrollment ? { ...register, Active: !register.Active } : register)));
  };

  // Estado para controlar la visibilidad del modal
  const [showUserModal, setShowUserModal] = useState(false);

  // Estado para controlar si se esta editando
  const [isEditing, setIsEditing] = useState(false);

  // Funciones para mostrar modal
  const handleShowUserModal = () => {
    setShowUserModal(true);
    setIsEditing(false);
  };

  // Filtrar Registros
  const filteredRegisters = users.filter(
    (register) => register.Name.toLowerCase().includes(searchName.toLowerCase()) && register.Enrollment.toString().includes(searchUserId.toLowerCase()) && (searchType ? register.Type.toString().includes(searchType.toLowerCase()) : true) // Filtra solo si hay un valor de searchType
  );
  // Seleccionar User
  const handleSelectUser = (user: User) => {
    setSelectedUserData({
      ...new User(),
      ...user,
    });
    setShowUserModal(true);
    setIsEditing(true);
  };

  // Estados para controlar el toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger' | 'info' | 'warning'>('info');

  // Estado para controlar el toast
  type ToastType = 'success' | 'danger' | 'info' | 'warning';
  const handleToast = (message: string, type: ToastType, show: boolean) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(show);
  };

  // Guardar/Editar User
  const handleSaveUser = async (user: User) => {
    setLoadingUsers(true);
    if (isEditing) {
      try {
        const response = await userService.updateUser(user.Enrollment, user);
        user.Password = '';
        if (response) {
          setUsersData((prevUsers) => prevUsers.map((existingUser) => (existingUser.Enrollment === user.Enrollment ? user : existingUser)));
          handleToast('Se ha actualizado el usuario correctamente', 'success', true);
        }
      } catch (error: any) {
        handleToast(error.message, 'warning', true);
      } finally {
        setLoadingUsers(false);
      }
    } else {
      try {
        const response = await userService.register(user);
        if (response) {
          user.Password = '';
          setUsersData((prevUsers) => [...prevUsers, user]);
          handleToast('Se ha creado el usuario correctamente', 'success', true);
        }
      } catch (error: any) {
        handleToast(error.message, 'warning', true);
      } finally {
        setLoadingUsers(false);
      }
    }
  };

  const getUsers = async () => {
    setLoadingUsers(true);
    try {
      const data = await userService.getAllUsers();
      setUsersData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Cargar las asesorías al montar el componente
  useEffect(() => {
    const fetchAdvices = async () => {
      getUsers();
    };

    fetchAdvices();
  }, []);

  return (
    <Container className="mt-4 bg-white" style={{ minHeight: '100vh' }}>
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

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon3">
              <BsPeopleFill className="fs-5" />
            </InputGroup.Text>
            <Form.Select aria-label="Tipo" value={searchType} onChange={handleTypeChange}>
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
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
              setSearchType('');
              setSearchUserId('');
            }}>
            <BsXCircleFill className="me-1 fs-5" />
            Limpiar Filtros
          </Button>
        </Col>
      </Row>
      <Row className="shadow-sm rounded overflow-hidden p-2 my-2">
        <Col xs={12} lg={12} className="d-flex justify-content-between my-2">
          <Button className="button d-flex align-items-center justify-content-center me-1" onClick={getUsers}>
            <BsArrowClockwise className=" fs-5" />
          </Button>
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
              <UserTable DataSource={filteredRegisters} toggleUserStatus={toggleUserStatus} handleEditUser={handleSelectUser} />
            )}
          </Container>
        </Col>
      </Row>
      <UserModal show={showUserModal} isEditing={isEditing} setShowUserModal={setShowUserModal} user={selectedUser} setSelectedUserData={setSelectedUserData} handleSaveUser={handleSaveUser} />
      <CustomToast show={showToast} message={toastMessage} type={toastType} duration={3000} onClose={() => setShowToast(false)} />
    </Container>
  );
};

export default Users;
