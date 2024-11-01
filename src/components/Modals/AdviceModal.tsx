import React from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { BsPerson, BsBook, BsPersonBadge, BsFillCalendarDateFill, BsClock, BsXCircle, BsCheckCircle } from 'react-icons/bs';
import { AdvisorySession } from '../../shared/models/advisory-session.interface';

interface AdviceModalProps {
  show: boolean;
  handleClose: () => void;
  handleSaveChanges: () => void;
  advice: AdvisorySession;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: AdvisorySession;
}

const AdviceModal: React.FC<AdviceModalProps> = ({ show, handleClose, handleSaveChanges, advice, handleInputChange, errors }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Asesoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="p-2">
          <Form.Group controlId="formAdvisor" className="mb-3">
            <Form.Label>Asesor</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsPerson className="fs-5" />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Nombre del asesor" name="Advisor" value={advice.AdvisorIdentity} onChange={handleInputChange} required isInvalid={!!errors.AdvisorIdentity} />
              <Form.Control.Feedback type="invalid">{errors.AdvisorIdentity}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formAdvisee" className="mb-3">
            <Form.Label>Asesorado</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsPerson className="fs-5" />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Nombre del asesorado" name="Advisee" value={advice.AdviseeIdentity} onChange={handleInputChange} required isInvalid={!!errors.AdviseeIdentity} />
              <Form.Control.Feedback type="invalid">{errors.AdviseeIdentity}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formEnrollment" className="mb-3">
            <Form.Label>Matrícula</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsPersonBadge className="fs-5" />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Matrícula del asesorado" name="Enrollment" value={advice.AdviseeStudentId} onChange={handleInputChange} required isInvalid={!!errors.AdviseeStudentId} />
              <Form.Control.Feedback type="invalid">{errors.AdviseeStudentId}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formLearningUnit" className="mb-3">
            <Form.Label>Materia</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsBook className="fs-5" />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Nombre de la materia" name="LearningUnit" value={advice.LearningUnitIdentity} onChange={handleInputChange} required isInvalid={!!errors.LearningUnitIdentity} />
              <Form.Control.Feedback type="invalid">{errors.LearningUnitIdentity}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formTopic" className="mb-3">
            <Form.Label>Tema</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsFillCalendarDateFill className="fs-5" />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Tema de la asesoría" name="Topic" value={advice.Topic} onChange={handleInputChange} required isInvalid={!!errors.Topic} />
              <Form.Control.Feedback type="invalid">{errors.Topic}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formStartTime" className="mb-3">
            <Form.Label>Hora de Inicio</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsClock className="fs-5" />
              </InputGroup.Text>
              <Form.Control type="time" name="StartTime" value={advice.StartTime.toDateString()} onChange={handleInputChange} required isInvalid={!!errors.StartTime} />
              <Form.Control.Feedback type="invalid">{errors.StartTime.toDateString()}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formEndTime" className="mb-3">
            <Form.Label>Hora de Fin</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsClock className="fs-5" />
              </InputGroup.Text>
              <Form.Control type="time" name="EndTime" value={advice.EndTime.toDateString()} onChange={handleInputChange} required isInvalid={!!errors.EndTime} />
              <Form.Control.Feedback type="invalid">{errors.EndTime.toDateString()}</Form.Control.Feedback>
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

export default AdviceModal;
