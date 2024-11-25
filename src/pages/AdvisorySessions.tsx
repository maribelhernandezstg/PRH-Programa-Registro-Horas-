import "../App.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, InputGroup, Form, Spinner } from "react-bootstrap";
import {
  BsFillFilePersonFill,
  BsBook,
  BsPersonWorkspace,
  BsPlusSquareFill,
  BsSearch,
  BsXCircleFill,
} from "react-icons/bs";

import AdviceTable from "../components/Tables/AdviceTable"; // Componente para mostrar la tabla de asesorías
import AdviceModal from "../components/Modals/AdvisorySessionModal"; // Componente modal para añadir/editar asesorías

import { AdvisorySessionService } from "../services/advisory-session-service";
import { AdvisorySession } from "../shared/models/advisory-session.class"; // Interfaz para el modelo de sesión de asesoría
import { AdvisorySessionErrors } from "../shared/forms-errors/advisory-session-error.class";

import { LearningUnitService } from "../services/learning-units-service";
import { LearningUnit } from "../shared/models/learning-unit.class";

import { Advisor } from "../shared/models/advisor.class";
import { AdvisorService } from "../services/advisor-service";

import { Advisee } from "../shared/models/advisee.class";
import { AdviseeService } from "../services/advisee-service";

interface SimplifiedAdvice {
  AdvisorIdentity: string;
  AdviseeIdentity: string;
  AdviseeStudentId: string;
  LearningUnitIdentity: string;
  Topic: string;
  StartTime: string;
  EndTime: string;
  ClassType: string; // Agregado aquí para incluir el tipo de clase
}

const Advices = () => {
  const advisorySessionsService = new AdvisorySessionService();

  const [advisees, setAdvisees] = useState<Advisee[]>([]); // Almacenar asesorados activos
  const [advisors, setAdvisors] = useState<Advisor[]>([]); // Estado para los asesores activos
  const [learningUnits, setLearningUnits] = useState<LearningUnit[]>([]);

  const [searchAdvisee, setSearchAdvisee] = useState("");
  const [searchLearningUnit, setSearchLearningUnit] = useState("");
  const [searchAdvisor, setSearchAdvisor] = useState("");
  const [loadingAdvices, setLoadingAdvices] = useState(true);

  const [advices, setAdvicesData] = useState<AdvisorySession[]>([]);

  const [showAdviceModal, setShowAdviceModal] = useState(false);
  const [selectedAdvice, setSelectedAdvice] = useState<AdvisorySession | null>(null);

  const initialAdvice = new AdvisorySession();
  const initialErrors = new AdvisorySessionErrors();

  const [newAdvice, setNewAdvice] = useState<AdvisorySession>(initialAdvice);
  const [errors, setErrors] = useState<AdvisorySessionErrors>(initialErrors);

  const handleShowAdviceModal = () => setShowAdviceModal(true);
  const handleCloseAdviceModal = () => {
    setShowAdviceModal(false);
    setSelectedAdvice(null);
    setNewAdvice(new AdvisorySession());
    setErrors(new AdvisorySessionErrors());
  };

  const handleEditAdvice = (advice: SimplifiedAdvice) => {
    const fullAdvice: AdvisorySession = {
      ...advice,
      SessionDate: selectedAdvice?.SessionDate || new Date(),
      Identity: selectedAdvice?.Identity ?? 0,
      Professor: selectedAdvice?.Professor || "",
      ClassType: selectedAdvice?.ClassType || "",
      UserCreation: selectedAdvice?.UserCreation || 0,
      CreatedAt: selectedAdvice?.CreatedAt || new Date(),
      UserUpdate: selectedAdvice?.UserUpdate || 0,
      UpdatedAt: selectedAdvice?.UpdatedAt || new Date(),
      Active: selectedAdvice?.Active || true,
    };

    setSelectedAdvice(fullAdvice);
    setNewAdvice({ ...fullAdvice });
    handleShowAdviceModal();
  };

  const handleSaveChanges = async () => {
    const newErrors = {
      AdvisorIdentity: newAdvice.AdvisorIdentity ? "" : "Campo requerido",
      AdviseeIdentity: newAdvice.AdviseeIdentity ? "" : "Campo requerido",
      LearningUnitIdentity: newAdvice.LearningUnitIdentity ? "" : "Campo requerido",
      Topic: newAdvice.Topic ? "" : "Campo requerido",
      StartTime: newAdvice.StartTime ? "" : "Campo requerido",
      EndTime: newAdvice.EndTime ? "" : "Campo requerido",
      Professor: newAdvice.Professor ? "" : "Campo requerido", // Validar el campo Profesor
      ClassType: newAdvice.ClassType ? "" : "Campo requerido", // Validar el campo Tipo de Clase
    };
    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      try {
        // Formatear hora de inicio y fin si son objetos Date
        const startTime =
          typeof newAdvice.StartTime === "string"
            ? newAdvice.StartTime
            : newAdvice.StartTime.toTimeString().split(" ")[0];
        const endTime =
          typeof newAdvice.EndTime === "string"
            ? newAdvice.EndTime
            : newAdvice.EndTime.toTimeString().split(" ")[0];

        // Preparar los datos para enviar al backend
        const sessionToSave = {
          LearningUnitIdentity: parseInt(newAdvice.LearningUnitIdentity, 10),
          Topic: newAdvice.Topic,
          Professor: newAdvice.Professor, // Campo Profesor del input
          ClassType: newAdvice.ClassType, // Campo Tipo de Clase
          AdvisorIdentity: parseInt(newAdvice.AdvisorIdentity, 10), // Campo Asesor (matrícula)
          AdviseeIdentity: parseInt(newAdvice.AdviseeIdentity, 10), // Campo Asesorado (matrícula)
          SessionDate: newAdvice.SessionDate.toISOString().split("T")[0],
          StartTime: startTime,
          EndTime: endTime,
        };

        // Imprimir en consola los datos preparados para enviar
        console.log("Datos enviados al backend:", sessionToSave);

        if (selectedAdvice) {
          // Actualizar asesoría existente
          const updatedAdvice = await advisorySessionsService.updateAdvisorySession(
            selectedAdvice.Identity,
            sessionToSave
          );
          setAdvicesData((prev) =>
            prev.map((advice) =>
              advice.Identity === updatedAdvice.Identity ? updatedAdvice : advice
            )
          );
        } else {
          // Crear nueva asesoría
          const createdAdvice = await advisorySessionsService.createAdvisorySession(
            sessionToSave
          );
          setAdvicesData((prev) => [...prev, createdAdvice]);
        }

        handleCloseAdviceModal();
      } catch (error) {
        console.error("Error al guardar la sesión de asesoría:", error);
      }
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewAdvice({ ...newAdvice, [name]: value });
  };

  useEffect(() => {
    const fetchLearningUnits = async () => {
      try {
        const learningUnitService = new LearningUnitService();
        const units = await learningUnitService.getAllLearningUnits();
        setLearningUnits(units);
      } catch (error) {
        console.error("Error al obtener las materias:", error);
      }
    };

    const fetchActiveAdvisors = async () => {
      try {
        const advisorService = new AdvisorService();
        const allAdvisors = await advisorService.getAllAdvisors();
        const activeAdvisors = allAdvisors.filter((advisor) => advisor.Active);
        setAdvisors(activeAdvisors);
      } catch (error) {
        console.error("Error al obtener los asesores activos:", error);
      }
    };

    const fetchActiveAdvisees = async () => {
      try {
        const adviseeService = new AdviseeService();
        const allAdvisees = await adviseeService.getAllAdvisees();
        const activeAdvisees = allAdvisees.filter((advisee) => advisee.Active);
        setAdvisees(activeAdvisees);
      } catch (error) {
        console.error("Error al obtener los asesorados activos:", error);
      }
    };

    fetchActiveAdvisees();
    fetchLearningUnits();
    fetchActiveAdvisors();
  }, []);

  return (
    <Container className="mt-4 bg-white" style={{ minHeight: "100vh" }}>
      {/* Encabezado */}
      <Row className="px-2 py-1">
        <Col xs={12} lg={12}>
          <h1 className="fs-3 fw-bold text-start">Asesorías</h1>
        </Col>
      </Row>

      {/* Filtros de búsqueda */}
      <Row className="shadow-sm rounded p-2 my-2">
        <Col xs={12} lg={8} className="d-flex my-2">
          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon1">
              <BsFillFilePersonFill className="fs-5" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Asesorado"
              aria-label="Asesorado"
              value={searchAdvisee}
              onChange={(e) => setSearchAdvisee(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon2">
              <BsBook className="fs-5" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Materia"
              aria-label="Materia"
              value={searchLearningUnit}
              onChange={(e) => setSearchLearningUnit(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon3">
              <BsPersonWorkspace className="fs-5" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Asesor"
              aria-label="Asesor"
              value={searchAdvisor}
              onChange={(e) => setSearchAdvisor(e.target.value)}
            />
          </InputGroup>
        </Col>

        <Col xs={12} lg={4} className="d-flex justify-content-end my-2">
          <Button
            className="button d-flex align-items-center justify-content-center me-1"
            onClick={() => {
              setSearchAdvisee("");
              setSearchLearningUnit("");
              setSearchAdvisor("");
            }}
          >
            <BsXCircleFill className="me-1 fs-5" />
            Limpiar
          </Button>
          <Button
            className="button d-flex align-items-center justify-content-center"
            onClick={() => console.log("Buscando...")}
          >
            <BsSearch className="me-1 fs-5" />
            Buscar
          </Button>
        </Col>
      </Row>

      {/* Botón para añadir nueva asesoría y tabla de asesorías */}
      <Row className="shadow-sm rounded overflow-hidden p-2 my-2">
        <Col xs={12} lg={12} className="d-flex justify-content-end my-2">
          <Button
            className="buttonGreen d-flex align-items-center justify-content-center"
            variant="success"
            onClick={handleShowAdviceModal}
          >
            <BsPlusSquareFill className="me-1 fs-5" /> Nueva
          </Button>
        </Col>
        <Col xs={12} lg={12}>
          <Container>
            {loadingAdvices ? (
              <div className="text-center">
                <Spinner animation="grow" />
                <p>Cargando asesorías...</p>
              </div>
            ) : (
              <AdviceTable
                DataSource={advices.map((advice) => ({
                  ...advice,
                  ClassType: advice.ClassType || "Ordinaria",
                }))}
                onEdit={handleEditAdvice}
              />
            )}
          </Container>
        </Col>
      </Row>

      <AdviceModal
        show={showAdviceModal}
        handleClose={handleCloseAdviceModal}
        handleSaveChanges={handleSaveChanges}
        advice={newAdvice}
        handleInputChange={handleInputChange}
        errors={errors}
        mode={selectedAdvice ? "Editar" : "Agregar"}
        learningUnits={learningUnits}
        advisors={advisors}
        advisees={advisees}
      />
    </Container>
  );
};

export default Advices;
