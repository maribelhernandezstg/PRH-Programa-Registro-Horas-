import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';

const Excel = () => {
  return (
    <Container>
      <Row className="d-flex justify-content-center mt-3">
        <Col md={6} className="text-start">
          <h1 className="fs-3 fw-bold text-center">Excel</h1>
          <h2 className="mb-4 fs-4 text-center">Cargar un Excel de Asesores</h2>
          <p>(Ejemplo de columnas: Nombre, Matrícula, Carrera, Género)</p>

          {/*Cargar Excel */}
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label className="fw-bold">
                Selecciona el archivo Excel:
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Control aria-describedby="basic-addon2" type="file" />
                <Button variant="primary" id="button-addon2">
                  Cargar Excel
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>

          {/*Generar Reporte*/}
          <h2 className="mb-2 mt-2 fs-4 text-center">
            Generar un reporte de Excel
          </h2>
          <p className="text-start">
            Esto lo genera y dejara descargar en una carpeta a tu eleccion
          </p>
          <div className="d-flex justify-content-center">
            <Button variant="success">Descargar Excel</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Excel;
