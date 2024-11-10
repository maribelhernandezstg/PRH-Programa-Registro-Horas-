import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface CustomConfirmationModal {
  show: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const ConfirmationModal: React.FC<CustomConfirmationModal> = ({ show, title, message, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Cancelar</Button>
          <Button variant="primary">Aceptar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default ConfirmationModal;
