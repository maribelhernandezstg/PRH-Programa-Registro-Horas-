import React from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import {
  BsPerson,
  BsBook,
  BsPersonBadge,
  BsFillCalendarDateFill,
  BsClock,
  BsXCircle,
  BsCheckCircle,
} from "react-icons/bs";
import { AdvisorySession } from "../../shared/models/advisory-session.class";
import { AdvisorySessionErrors } from "../../shared/forms-errors/advisory-session-error.class";
import { LearningUnit } from "../../shared/models/learning-unit.class";
import { Advisor } from "../../shared/models/advisor.class";
import { Advisee } from "../../shared/models/advisee.class";

interface AdviceModalProps {
  show: boolean;
  handleClose: () => void;
  handleSaveChanges: () => void;
  advice: AdvisorySession;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  errors: AdvisorySessionErrors;
  mode: "Agregar" | "Editar";
  learningUnits: LearningUnit[];
  advisors: Advisor[];
  advisees: Advisee[];
}

const AdviceModal: React.FC<AdviceModalProps> = ({
  show,
  handleClose,
  handleSaveChanges,
  advice,
  handleInputChange,
  errors,
  mode,
  learningUnits,
  advisors,
  advisees,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "Agregar" ? "Agregar Asesoría" : "Editar Asesoría"}
        </Modal.Title>
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
              <Form.Select
                name="AdvisorIdentity"
                value={advice.AdvisorIdentity || ""}
                onChange={handleInputChange}
                required
                isInvalid={!!errors.AdvisorIdentity}
              >
                <option value="">Seleccione un asesor</option>
                {advisors.map((advisor) => (
                  <option key={advisor.Enrollment} value={advisor.Enrollment}>
                    {advisor.Name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.AdvisorIdentity}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Campo: Asesorado */}
          <Form.Group controlId="formAdvisee" className="mb-3">
            <Form.Label>Asesorado</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsPerson className="fs-5" />
              </InputGroup.Text>
              <Form.Select
                name="AdviseeIdentity"
                value={advice.AdviseeIdentity || ""}
                onChange={(e) => {
                  const selectedAdvisee = advisees.find(
                    (advisee) => advisee.Enrollment === Number(e.target.value)
                  );
                  if (selectedAdvisee) {
                    handleInputChange({
                      target: {
                        name: "AdviseeIdentity",
                        value: selectedAdvisee.Enrollment.toString(),
                      },
                    });
                    handleInputChange({
                      target: {
                        name: "AdviseeStudentId",
                        value: selectedAdvisee.Enrollment.toString(),
                      },
                    });
                  }
                }}
                required
                isInvalid={!!errors.AdviseeIdentity}
              >
                <option value="">Seleccione un asesorado</option>
                {advisees.map((advisee) => (
                  <option key={advisee.Enrollment} value={advisee.Enrollment}>
                    {advisee.Name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.AdviseeIdentity}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Campo: Matrícula (readonly) */}
          <Form.Group controlId="formEnrollment" className="mb-3">
            <Form.Label>Matrícula</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsPersonBadge className="fs-5" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="AdviseeStudentId"
                value={advice.AdviseeStudentId || ""}
                readOnly
                isInvalid={!!errors.AdviseeStudentId}
              />
              <Form.Control.Feedback type="invalid">
                {errors.AdviseeStudentId}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Campo: Materia */}
          <Form.Group controlId="formLearningUnit" className="mb-3">
            <Form.Label>Materia</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsBook className="fs-5" />
              </InputGroup.Text>
              <Form.Select
                name="LearningUnitIdentity"
                value={advice.LearningUnitIdentity || ""}
                onChange={handleInputChange}
                required
                isInvalid={!!errors.LearningUnitIdentity}
              >
                <option value="">Seleccione una materia</option>
                {learningUnits.map((unit) => (
                  <option key={unit.Identity} value={unit.Identity}>
                    {unit.Name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.LearningUnitIdentity}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Campo: Tema */}
          <Form.Group controlId="formTopic" className="mb-3">
            <Form.Label>Tema</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsFillCalendarDateFill className="fs-5" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Tema de la asesoría"
                name="Topic"
                value={advice.Topic || ""}
                onChange={handleInputChange}
                required
                isInvalid={!!errors.Topic}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Topic}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Campo: Hora de Inicio */}
          <Form.Group controlId="formStartTime" className="mb-3">
            <Form.Label>Hora de Inicio</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsClock className="fs-5" />
              </InputGroup.Text>
              <Form.Control
                type="time"
                name="StartTime"
                value={advice.StartTime.toLocaleTimeString("en-US", {
                  hour12: false,
                })}
                onChange={handleInputChange}
                required
                isInvalid={!!errors.StartTime}
              />
              <Form.Control.Feedback type="invalid">
                {errors.StartTime}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Campo: Hora de Fin */}
          <Form.Group controlId="formEndTime" className="mb-3">
            <Form.Label>Hora de Fin</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsClock className="fs-5" />
              </InputGroup.Text>
              <Form.Control
                type="time"
                name="EndTime"
                value={advice.EndTime.toLocaleTimeString("en-US", {
                  hour12: false,
                })}
                onChange={handleInputChange}
                required
                isInvalid={!!errors.EndTime}
              />
              <Form.Control.Feedback type="invalid">
                {errors.EndTime}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="my-2">
        <Button
          onClick={handleClose}
          className="d-flex align-items-center justify-content-center"
          variant="secondary"
        >
          <BsXCircle className="me-1 fs-5" /> Cancelar
        </Button>
        <Button
          onClick={handleSaveChanges}
          className="button d-flex align-items-center justify-content-center"
          variant="primary"
        >
          <BsCheckCircle className="me-1 fs-5" />{" "}
          {mode === "Agregar" ? "Guardar" : "Actualizar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdviceModal;
