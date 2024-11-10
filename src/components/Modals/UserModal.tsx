import { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { BsPersonVcard, Bs123, BsXCircle, BsCheckCircle, BsPeopleFill, BsKey } from 'react-icons/bs';
import { User } from '../../shared/models/user.class';
import { UserErrors } from '../../shared/forms-errors/user-error.class';

interface UserModalProps {
  show: boolean;
  isEditing: boolean;
  setShowUserModal: (show: boolean) => void;
  user: User;
  setSelectedUserData: (selectedUser: any) => void;
  handleSaveUser: (user: User) => void;
}

const UserModal: React.FC<UserModalProps> = ({ show, isEditing, setShowUserModal, user, setSelectedUserData, handleSaveUser }) => {
  const initialUser: User = new User();
  const [errors, setErrors] = useState(new UserErrors());
  const [confirmPassword, setConfirmPassword] = useState('');
  // Save User
  const handleSaveChanges = () => {
    const newErrors = new UserErrors(!user.Enrollment ? 'Campo requerido' : '', !user.Name ? 'Campo requerido' : '', !isEditing && !user.Password ? 'Campo requerido' : '', !user.Type ? 'Campo requerido' : '');
    console.log(user);
    if (!isEditing && user.Password !== confirmPassword) {
      newErrors.Password = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === '')) {
      handleSaveUser(user);
      handleCloseUserModal();
    }
  };

  // Manejar el cambio en el formulario del modal
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setSelectedUserData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Manejar el cambio en el campo de confirmar contraseña
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleCloseUserModal = () => {
    setConfirmPassword('');
    setShowUserModal(false);
    setSelectedUserData(initialUser);
  };

  return (
    <Modal show={show} onHide={handleCloseUserModal}>
      <Modal.Header closeButton>
        <Modal.Title>{!isEditing ? 'Agregar Usuario' : 'Editar Usuario'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="p-2">
          {/* ----------- Matrícula ----------- */}
          <Form.Group controlId="formEnrollment" className="mb-3">
            <Form.Label>Matrícula</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <Bs123 className="fs-5" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Ingresa la matrícula del usuario"
                name="Enrollment"
                value={user.Enrollment}
                onChange={handleInputChange}
                required
                isInvalid={!!errors.Enrollment} // Mostrar error si hay
              />
              <Form.Control.Feedback type="invalid">{errors.Enrollment}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* ----------- Contraseña ----------- */}
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsKey className="fs-5" />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Ingresa la contraseña del usuario"
                name="Password"
                value={user.Password}
                onChange={handleInputChange}
                required={!isEditing}
                isInvalid={!!errors.Password} // Mostrar error si hay
              />
              <Form.Control.Feedback type="invalid">{errors.Password}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* ----------- Confirmar Contraseña ----------- */}
          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Confirmar contraseña</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsKey className="fs-5" />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Repite la contraseña del usuario"
                name="ConfirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required={!isEditing}
                isInvalid={!!errors.Password} // Mostrar error si hay
              />
              <Form.Control.Feedback type="invalid">{errors.Password}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* ----------- Nombre ----------- */}
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsPersonVcard className="fs-5" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre del usuario"
                name="Name"
                value={user.Name}
                onChange={handleInputChange}
                required
                isInvalid={!!errors.Name} // Mostrar error si hay
              />
              <Form.Control.Feedback type="invalid">{errors.Name}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* ----------- Tipo ----------- */}
          <Form.Group controlId="formType" className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsPeopleFill className="fs-5" />
              </InputGroup.Text>
              <Form.Control as="select" name="Type" value={user.Type || '2'} onChange={handleInputChange} required isInvalid={!!errors.Type}>
                <option key="1" value="1">
                  Admin
                </option>
                <option key="2" value="2">
                  Recepción
                </option>
                <option key="3" value="3">
                  Asesor
                </option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.Type}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="my-2">
        <Button onClick={handleCloseUserModal} className="d-flex align-items-center justify-content-center" variant="secondary">
          <BsXCircle className="me-1 fs-5" /> Cancelar
        </Button>
        <Button onClick={handleSaveChanges} className="button d-flex align-items-center justify-content-center" variant="primary">
          <BsCheckCircle className="me-1 fs-5" /> {!isEditing ? 'Guardar' : 'Actualizar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
