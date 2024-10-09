import { Container, Row, Col, Button, Form } from "react-bootstrap";

const Excel = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6} className="text-center">
          
          <h2 className="mb-4">Cargar un Excel de Asesores</h2>
          <p>(Ejemplo de columnas: Nombre, Matrícula, Carrera, Género)</p>

          {/*Cargar Excel */}
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Selecciona el archivo Excel:</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Button variant="primary" className="mb-4">
              Cargar Excel
            </Button>
          </Form>

          {/*Generar Reporte*/}
          <h4>Generar un reporte de Excel</h4>
          <p>
            Esto lo genera y dejara descargar en una carpeta a tu eleccion
          </p>
          <Button variant="success">Descargar Excel</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Excel;
