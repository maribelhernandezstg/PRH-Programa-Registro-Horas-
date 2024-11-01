import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { BsXCircle, BsCheckCircle } from 'react-icons/bs';
import { Advisor } from '../../shared/models/advisor.interface';

interface AdvisorModalProps {
  show: boolean;
  handleClose: () => void;
}

const AdvisorModal: React.FC<AdvisorModalProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Asesor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="p-2"></Form>
      </Modal.Body>
      <Modal.Footer className="my-2">
        <Button onClick={handleClose} className="d-flex align-items-center justify-content-center" variant="secondary">
          <BsXCircle className="me-1 fs-5" /> Cancelar
        </Button>
        <Button className="button d-flex align-items-center justify-content-center" variant="primary">
          <BsCheckCircle className="me-1 fs-5" /> Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdvisorModal;
