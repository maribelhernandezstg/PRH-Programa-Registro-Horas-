import "../App.css";
import {
  Container,
  Row,
  Button,
  InputGroup,
  Col,
  Form,
  Spinner,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  BsPersonVcardFill,
  BsPersonBadgeFill,
  BsMortarboardFill,
  BsXCircleFill,
  BsPersonAdd,
  BsSearch,
} from "react-icons/bs";

import AdviseeTable from "../components/Tables/AdviseeTable";
import AdviseeModal from "../components/Modals/AdviseeModal";

import { getAllAdviseesDummy } from "../services/advisee-service";

import { Advisee } from "../shared/models/advisee.class";
import { AdviseeErrors } from "../shared/forms-errors/advisee-error.class";

interface SimplifiedAdvisee {
  Name: string;
  Enrollment: number;
  Gender: string;
  DegreeIdentity: string;
}

const Advisees = () => {
  const [searchName, setSearchName] = useState("");
  const [searchStudentId, setSearchStudentId] = useState("");
  const [searchCareer, setSearchCareer] = useState("");
  const [loadingAdvisees, setLoadingAdvisees] = useState(true);
  const [advisees, setAdviseesData] = useState<Advisee[]>([]);
  const [showAdviseeModal, setShowAdviseeModal] = useState(false);
  const [selectedAdvisee, setSelectedAdvisee] = useState<Advisee | null>(null);
  const [newAdvisee, setNewAdvisee] = useState<Advisee>(new Advisee());
  const [errors, setErrors] = useState<AdviseeErrors>(new AdviseeErrors());

  const handleShowAdviseeModal = () => setShowAdviseeModal(true);
  const handleCloseAdviseeModal = () => {
    setShowAdviseeModal(false);
    setSelectedAdvisee(null);
    setNewAdvisee(new Advisee());
    setErrors(new AdviseeErrors());
  };

  const handleEditAdvisee = (advisee: SimplifiedAdvisee) => {
    const fullAdvisee: Advisee = {
      ...advisee,
      UserCreation: selectedAdvisee?.UserCreation || 0,
      CreatedAt: selectedAdvisee?.CreatedAt || new Date(),
      UserUpdate: selectedAdvisee?.UserUpdate || 0,
      UpdatedAt: selectedAdvisee?.UpdatedAt || new Date(),
      Active: selectedAdvisee?.Active || true,
    };

    setSelectedAdvisee(fullAdvisee);
    setNewAdvisee({ ...fullAdvisee });
    handleShowAdviseeModal();
  };

  const handleSaveChanges = () => {
    const newErrors = new AdviseeErrors(
      !newAdvisee.Enrollment ? "Campo requerido" : "",
      !newAdvisee.Gender ? "Campo requerido" : "",
      !newAdvisee.Name ? "Campo requerido" : "",
      !newAdvisee.DegreeIdentity ? "Campo requerido" : ""
    );

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      if (selectedAdvisee) {
        const updatedAdvisees = advisees.map((advisee) =>
          advisee.Enrollment === selectedAdvisee.Enrollment
            ? newAdvisee
            : advisee
        );
        setAdviseesData(updatedAdvisees);
      } else {
        setAdviseesData([...advisees, newAdvisee]);
      }
      handleCloseAdviseeModal();
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewAdvisee({ ...newAdvisee, [name]: value });
  };

  const filteredAdvisees: SimplifiedAdvisee[] = advisees
    .filter((advisee) => {
      const regexName = new RegExp(searchName, "i");
      const regexStudentId = new RegExp(searchStudentId, "i");
      const regexCareer = new RegExp(searchCareer, "i");

      return (
        (!searchName || regexName.test(advisee.Name)) &&
        (!searchStudentId ||
          regexStudentId.test(advisee.Enrollment.toString())) &&
        (!searchCareer || regexCareer.test(advisee.DegreeIdentity))
      );
    })
    .map((advisee) => ({
      Name: advisee.Name,
      Enrollment: advisee.Enrollment,
      Gender: advisee.Gender,
      DegreeIdentity: advisee.DegreeIdentity,
    }));

  useEffect(() => {
    const fetchAdvices = async () => {
      setLoadingAdvisees(true);
      try {
        const data = await getAllAdviseesDummy();
        setAdviseesData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingAdvisees(false);
      }
    };

    fetchAdvices();
  }, []);

  return (
    <Container className="mt-4 bg-white" style={{ minHeight: "100vh" }}>
      <Row className="px-2 py-1">
        <Col xs={12} lg={12}>
          <h1 className="fs-3 fw-bold text-start">Asesorados</h1>
        </Col>
      </Row>
      <Row className="shadow-sm rounded p-2 my-2">
        <Col xs={12} lg={8} className="d-flex my-2">
          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon1">
              <BsPersonVcardFill className="fs-5" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Nombre(s)"
              aria-label="Nombre(s)"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon2">
              <BsPersonBadgeFill className="fs-5" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Matrícula"
              aria-label="Matrícula"
              value={searchStudentId}
              onChange={(e) => setSearchStudentId(e.target.value)}
              aria-describedby="basic-addon2"
            />
          </InputGroup>

          <InputGroup className="me-3">
            <InputGroup.Text id="basic-addon3">
              <BsMortarboardFill className="fs-5" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Carrera"
              aria-label="Carrera"
              value={searchCareer}
              onChange={(e) => setSearchCareer(e.target.value)}
              aria-describedby="basic-addon3"
            />
          </InputGroup>
        </Col>
        <Col xs={12} lg={4} className="d-flex justify-content-end my-2">
          <Button
            className="button d-flex align-items-center justify-content-center me-1"
            onClick={() => {
              setSearchName("");
              setSearchStudentId("");
              setSearchCareer("");
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
      <Row className="shadow-sm rounded overflow-hidden p-2 my-2">
        <Col xs={12} lg={12} className="d-flex justify-content-end my-2">
          <Button
            className="buttonGreen d-flex align-items-center justify-content-center"
            variant="success"
            onClick={handleShowAdviseeModal}
          >
            <BsPersonAdd className="me-1 fs-5" /> Agregar
          </Button>
        </Col>
        <Col xs={12} lg={12}>
          <Container>
            {loadingAdvisees ? (
              <div className="text-center">
                <Spinner animation="grow" />
                <p>Cargando asesorados...</p>
              </div>
            ) : (
              <AdviseeTable
                DataSource={filteredAdvisees}
                onEdit={handleEditAdvisee}
              />
            )}
          </Container>
        </Col>
      </Row>
      <AdviseeModal
        show={showAdviseeModal}
        handleClose={handleCloseAdviseeModal}
        handleSaveChanges={handleSaveChanges}
        advisee={newAdvisee}
        handleInputChange={handleInputChange}
        errors={errors}
        mode={selectedAdvisee ? "Editar" : "Agregar"}
      />
    </Container>
  );
};

export default Advisees;
