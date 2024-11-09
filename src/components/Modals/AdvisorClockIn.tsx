import { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { BsXCircle, BsCheckCircle, BsClock, BsMortarboardFill } from 'react-icons/bs';

import { dummyAdvisors } from '../../shared/mocks/advisors';

import { EntryExitRecord } from '../../shared/models/entry-exit-record.class';
import { EntryExitErrors } from '../../shared/forms-errors/entry-exit-error.class';

interface ClockInModalProps {
  show: boolean;
  handleClose: () => void;
}

const ClockInModal: React.FC<ClockInModalProps> = ({ show, handleClose }) => {
  const [entryExitRecord, setNewAdvisorClock] = useState<EntryExitRecord>(new EntryExitRecord());
  const [errors, setErrors] = useState<EntryExitErrors>(new EntryExitErrors());

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewAdvisorClock({ ...entryExitRecord, [name]: value });
  };

  const handleSaveChanges = () => {
    // Valida los campos y establece errores si es necesario
    const newErrors = {
      AdvisorIdentity: entryExitRecord.AdvisorIdentity ? '' : 'Campo requerido',
      AdviseeIdentity: entryExitRecord.EntryTime ? '' : 'Campo requerido',
      AdviseeStudentId: entryExitRecord.ExitTime ? '' : 'Campo requerido',
    };
    setErrors(newErrors);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Fichaje</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="p-2">
          <Form.Group controlId="formAdvisorIdentity" className="mb-3">
            <Form.Label>Asesor</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsMortarboardFill className="fs-5" />
              </InputGroup.Text>
              <Form.Control as="select" name="DegreeIdentity" value={entryExitRecord.AdvisorIdentity} onChange={handleInputChange} required isInvalid={!!errors.AdvisorIdentity}>
                {dummyAdvisors.map((advisor) => (
                  <option key={advisor.Enrollment} value={advisor.Enrollment}>
                    {advisor.Name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.AdvisorIdentity}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formStartTime" className="mb-3">
            <Form.Label>Hora de entrada</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsClock className="fs-5" />
              </InputGroup.Text>
              <Form.Control
                type="time"
                name="StartTime"
                value={entryExitRecord.EntryTime.toLocaleTimeString('en-US', {
                  hour12: false,
                })}
                onChange={handleInputChange}
                required
                isInvalid={!!errors.StartTime}
              />
              <Form.Control.Feedback type="invalid">{errors.StartTime}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formEndTime" className="mb-3">
            <Form.Label>Hora de salida</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsClock className="fs-5" />
              </InputGroup.Text>
              <Form.Control
                type="time"
                name="EndTime"
                value={entryExitRecord.ExitTime.toLocaleTimeString('en-US', {
                  hour12: false,
                })}
                onChange={handleInputChange}
                required
                isInvalid={!!errors.EndTime}
              />
              <Form.Control.Feedback type="invalid">{errors.EndTime}</Form.Control.Feedback>
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

export default ClockInModal;
