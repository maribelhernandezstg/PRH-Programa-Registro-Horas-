import React from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import {
  BsPerson,
  BsGenderAmbiguous,
  BsPersonBadge,
  BsMortarboardFill,
  BsXCircle,
  BsCheckCircle,
} from "react-icons/bs";
import { Advisee } from "../../shared/models/advisee.class";
import { AdviseeErrors } from "../../shared/forms-errors/advisee-error.class";

import { dummyDegrees } from "../../shared/mocks/degrees";

interface AdviseeModalProps {
  show: boolean;
  handleClose: () => void;
  handleSaveChanges: () => void;
  advisee: Advisee;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: AdviseeErrors;
  mode: "Agregar" | "Editar";
}

const AdviseeModal: React.FC<AdviseeModalProps> = ({
  show,
  handleClose,
  handleSaveChanges,
  advisee,
  handleInputChange,
  errors,
  mode,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "Agregar" ? "Agregar Asesorado" : "Editar Asesorado"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="p-2">
          <Form.Group controlId="formEnrollment" className="mb-3">
            <Form.Label>Matrícula</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsPersonBadge className="fs-5" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Matrícula"
                name="Enrollment"
                value={advisee.Enrollment}
                onChange={handleInputChange}
                required
                isInvalid={!!errors.Enrollment}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Enrollment}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formGender" className="mb-3">
            <Form.Label>Género</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsGenderAmbiguous className="fs-5" />
              </InputGroup.Text>
              <Form.Control
                as="select"
                name="Gender"
                value={advisee.Gender}
                onChange={handleInputChange}
                required
                isInvalid={!!errors.Gender}
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.Gender}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsPerson className="fs-5" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="Name"
                value={advisee.Name}
                onChange={handleInputChange}
                required
                isInvalid={!!errors.Name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Name}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formDegreeIdentity" className="mb-3">
            <Form.Label>Carrera</Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <BsMortarboardFill className="fs-5" />
              </InputGroup.Text>
              <Form.Control
                as="select"
                name="DegreeIdentity"
                value={advisee.DegreeIdentity}
                onChange={handleInputChange}
                required
                isInvalid={!!errors.DegreeIdentity}
              >
                {dummyDegrees.map((degree) => (
                  <option key={degree.Identity} value={degree.Identity}>
                    {degree.DegreeName}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.DegreeIdentity}
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

export default AdviseeModal;
