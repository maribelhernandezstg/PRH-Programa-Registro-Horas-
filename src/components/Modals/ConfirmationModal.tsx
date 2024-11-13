import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface CustomConfirmationModal {
  show: boolean;
  setConfirm: () => void;
  title: string;
  message: string;
  onClose: () => void;
}

const ConfirmationModal: React.FC<CustomConfirmationModal> = ({ show, setConfirm, title, message, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => setConfirm()}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
