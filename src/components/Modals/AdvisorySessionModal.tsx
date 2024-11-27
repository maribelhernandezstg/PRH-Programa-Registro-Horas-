import { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { BsPerson, BsBook, BsPersonBadge, BsFillCalendarDateFill, BsClock, BsXCircle, BsCheckCircle } from 'react-icons/bs';
import { AdvisorySession } from '../../shared/models/advisory-session.class';
import { AdvisorySessionErrors } from '../../shared/forms-errors/advisory-session-error.class';
import { LearningUnit } from '../../shared/models/learning-unit.class';
import { Advisor } from '../../shared/models/advisor.class';
import { Advisee } from '../../shared/models/advisee.class';

interface AdviceModalProps {
  show: boolean;
  isEditing: boolean;
  setShowAdviceModal: (show: boolean) => void;
  advice: AdvisorySession;
  setSelectedAdvice: (selectedAdvice: any) => void;
  handleSaveAdvice: (advice: AdvisorySession) => void;
  learningUnits: LearningUnit[];
  advisors: Advisor[];
  advisees: Advisee[];
}

const AdviceModal: React.FC<AdviceModalProps> = ({ show, isEditing, setShowAdviceModal, advice, setSelectedAdvice, handleSaveAdvice, learningUnits, advisors, advisees }) => {
  const initialAdvice: AdvisorySession = new AdvisorySession();
  const [errors, setErrors] = useState(new AdvisorySessionErrors());

  type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

  const handleSaveChanges = async () => {
    console.log(advice);
    const newErrors = new AdvisorySessionErrors(!advice.AdvisorIdentity ? 'Campo requerido' : '', !advice.Professor ? 'Campo requerido' : '', !advice.AdviseeIdentity ? 'Campo requerido' : '', !advice.LearningUnitIdentity ? 'Campo requerido' : '', !advice.Topic ? 'Campo requerido' : '', !advice.ClassType ? 'Campo requerido' : '', !advice.StartTime ? 'Campo requerido' : '');
    console.log(newErrors);
    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === '')) {
      handleSaveAdvice(advice);
      handleCloseAdviceModal();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<FormControlElement>) => {
    const { name, value } = e.target;

    setSelectedAdvice((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseAdviceModal = () => {
    setShowAdviceModal(false);
    setSelectedAdvice(initialAdvice);
  };

  return (
    <Modal show={show} onHide={handleCloseAdviceModal}>
      <Modal.Header closeButton>
        <Modal.Title>{!isEditing ? 'Agregar Asesoría' : 'Editar Asesoría'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="p-2">
          {/* Campo: Asesor */}
          <Form.Group controlId="formAdvisor" className="mb-3">
            <Form.Label>Asesor</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsPerson className="fs-5" />
              </InputGroup.Text>
              <Form.Select name="AdvisorIdentity" value={advice.AdvisorIdentity || ''} onChange={handleInputChange} required isInvalid={!!errors.AdvisorIdentity}>
                <option value="">Seleccione un asesor</option>
                {advisors.map((advisor) => (
                  <option key={advisor.Enrollment} value={advisor.Enrollment}>
                    {advisor.Name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.AdvisorIdentity}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Campo: Profesor */}
          <Form.Group controlId="formProfessor" className="mb-3">
            <Form.Label>Profesor</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsPerson className="fs-5" />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Nombre del profesor" name="Professor" value={advice.Professor || ''} onChange={handleInputChange} required isInvalid={!!errors.Professor} />
              <Form.Control.Feedback type="invalid">{errors.Professor}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Campo: Asesorado */}
          <Form.Group controlId="formAdvisee" className="mb-3">
            <Form.Label>Matrícula del Asesorado</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsPersonBadge className="fs-5" />
              </InputGroup.Text>
              <Form.Select name="AdviseeIdentity" value={advice.AdviseeIdentity || ''} onChange={handleInputChange} required isInvalid={!!errors.AdviseeIdentity}>
                <option value="">Seleccione una matrícula</option>
                {advisees.map((advisee) => (
                  <option key={advisee.Enrollment} value={advisee.Enrollment}>
                    {advisee.Enrollment}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.AdviseeIdentity}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Campo: Materia */}
          <Form.Group controlId="formLearningUnit" className="mb-3">
            <Form.Label>Materia</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsBook className="fs-5" />
              </InputGroup.Text>
              <Form.Select name="LearningUnitIdentity" value={advice.LearningUnitIdentity || ''} onChange={handleInputChange} required isInvalid={!!errors.LearningUnitIdentity}>
                <option value="">Seleccione una materia</option>
                {learningUnits.map((unit) => (
                  <option key={unit.Identity} value={unit.Identity}>
                    {unit.Name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.LearningUnitIdentity}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Campo: Tema */}
          <Form.Group controlId="formTopic" className="mb-3">
            <Form.Label>Tema</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsFillCalendarDateFill className="fs-5" />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Tema de la asesoría" name="Topic" value={advice.Topic || ''} onChange={handleInputChange} required isInvalid={!!errors.Topic} />
              <Form.Control.Feedback type="invalid">{errors.Topic}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Campo: Tipo de Clase */}
          <Form.Group controlId="formClassType" className="mb-3">
            <Form.Label>Tipo de Clase</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsPerson className="fs-5" />
              </InputGroup.Text>
              <Form.Select name="ClassType" value={advice.ClassType || ''} onChange={handleInputChange} required isInvalid={!!errors.ClassType}>
                <option value="">Seleccione un tipo</option>
                <option value="Ordinaria">Ordinaria</option>
                <option value="Asesoria">Asesoría</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.ClassType}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Campo: Hora de Inicio */}
          <Form.Group controlId="formStartTime" className="mb-3">
            <Form.Label>Hora de Inicio</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsClock className="fs-5" />
              </InputGroup.Text>
              <Form.Control type="time" name="StartTime" value={advice.StartTime || ''} onChange={handleInputChange} required isInvalid={!!errors.StartTime} />
              <Form.Control.Feedback type="invalid">{errors.StartTime}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Campo: Hora de Fin */}
          <Form.Group controlId="formEndTime" className="mb-3">
            <Form.Label>Hora de Fin</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsClock className="fs-5" />
              </InputGroup.Text>
              <Form.Control type="time" name="EndTime" value={advice.EndTime || ''} onChange={handleInputChange} required isInvalid={!!errors.EndTime} />
              <Form.Control.Feedback type="invalid">{errors.EndTime}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="my-2">
        <Button onClick={handleCloseAdviceModal} className="d-flex align-items-center justify-content-center" variant="secondary">
          <BsXCircle className="me-1 fs-5" /> Cancelar
        </Button>
        <Button onClick={handleSaveChanges} className="button d-flex align-items-center justify-content-center" variant="primary">
          <BsCheckCircle className="me-1 fs-5" /> {!isEditing ? 'Guardar' : 'Actualizar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdviceModal;
