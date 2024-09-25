import { Container, Row, Col } from "react-bootstrap";
import "../App.css";
import { Filters } from "../components/Filters/Filters";

const Asesorados = () => {
  return (
    <Container className="window-container">
      <Row className="">
        <p className="title-container">Asesorados</p>
        <Filters />
      </Row>
    </Container>
  );
};

export default Asesorados;
