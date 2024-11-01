import React from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { BsPersonVcard, Bs123, BsXCircle, BsCheckCircle } from 'react-icons/bs';

interface UserModalProps {
  show: boolean;
  handleClose: () => void;
  handleSaveChanges: () => void;
  user: { Name: string; Enrollment: string; Active: boolean };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { Name: string; Enrollment: string };
}

const UserModal: React.FC<UserModalProps> = ({ show, handleClose, handleSaveChanges, user, handleInputChange, errors }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="p-2">
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
        </Form>
      </Modal.Body>
      <Modal.Footer className="my-2">
        <Button onClick={handleClose} className="d-flex align-items-center justify-content-center" variant="secondary">
          <BsXCircle className="me-1 fs-5" /> Cancelar
        </Button>
        <Button onClick={handleSaveChanges} className="button d-flex align-items-center justify-content-center" variant="primary">
          <BsCheckCircle className="me-1 fs-5" /> Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
