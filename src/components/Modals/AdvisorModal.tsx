import { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { BsPerson, BsGenderAmbiguous, BsPersonBadge, BsMortarboardFill, BsXCircle, BsCheckCircle } from 'react-icons/bs';
import { Advisor } from '../../shared/models/advisor.class';
import { AdvisorErrors } from '../../shared/forms-errors/advisor-error.class';

import { dummyDegrees } from '../../shared/mocks/degrees';

interface AdvisorModalProps {
  show: boolean;
  isEditing: boolean;
  setShowAdvisorModal: (show: boolean) => void;
  advisor: Advisor;
  setSelectedAdvisor: (selectedAdvisor: any) => void;
  handleSaveAdvisor: (advisor: Advisor) => void;
}

const AdvisorModal: React.FC<AdvisorModalProps> = ({ show, isEditing, setShowAdvisorModal, advisor, setSelectedAdvisor, handleSaveAdvisor }) => {
  const initialAdvisor: Advisor = new Advisor();
  const [errors, setErrors] = useState(new AdvisorErrors());

  const handleSaveChanges = async () => {
    const newErrors = new AdvisorErrors(!advisor.Enrollment ? 'Campo requerido' : '', !advisor.Gender ? 'Campo requerido' : '', !advisor.Name ? 'Campo requerido' : '', !advisor.DegreeIdentity ? 'Campo requerido' : '');
    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === '')) {
      handleSaveAdvisor(advisor);
      handleCloseAdvisorModal();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setSelectedAdvisor((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCloseAdvisorModal = () => {
    setShowAdvisorModal(false);
    setSelectedAdvisor(initialAdvisor);
  };

  return (
    <Modal show={show} onHide={handleCloseAdvisorModal}>
      <Modal.Header closeButton>
        <Modal.Title>{!isEditing ? 'Agregar Asesor' : 'Editar Asesor'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="p-2">
          <Form.Group controlId="formEnrollment" className="mb-3">
            <Form.Label>Matrícula</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsPersonBadge className="fs-5" />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Matrícula" name="Enrollment" readOnly={isEditing} value={advisor.Enrollment} onChange={handleInputChange} required isInvalid={!!errors.Enrollment} />
              <Form.Control.Feedback type="invalid">{errors.Enrollment}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formGender" className="mb-3">
            <Form.Label>Género</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsGenderAmbiguous className="fs-5" />
              </InputGroup.Text>
              <Form.Control as="select" name="Gender" value={advisor.Gender || 'Masculino'} onChange={handleInputChange} required isInvalid={!!errors.Gender}>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.Gender}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsPerson className="fs-5" />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Nombre" name="Name" value={advisor.Name} onChange={handleInputChange} required isInvalid={!!errors.Name} />
              <Form.Control.Feedback type="invalid">{errors.Name}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formDegreeIdentity" className="mb-3">
            <Form.Label>Carrera</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsMortarboardFill className="fs-5" />
              </InputGroup.Text>
              <Form.Control as="select" name="DegreeIdentity" value={advisor.DegreeIdentity} onChange={handleInputChange} required isInvalid={!!errors.DegreeIdentity}>
                {dummyDegrees.map((degree) => (
                  <option key={degree.Identity} value={degree.Identity}>
                    {degree.DegreeName}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.DegreeIdentity}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="my-2">
        <Button onClick={handleCloseAdvisorModal} className="d-flex align-items-center justify-content-center" variant="secondary">
          <BsXCircle className="me-1 fs-5" /> Cancelar
        </Button>
        <Button onClick={handleSaveChanges} className="button d-flex align-items-center justify-content-center" variant="primary">
          <BsCheckCircle className="me-1 fs-5" /> {!isEditing ? 'Guardar' : 'Actualizar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdvisorModal;
