import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { BsUpload, BsDownload } from 'react-icons/bs';

const Excel = () => {
  return (
    <Container className="d-flex justify-content-center mt-4" style={{ minHeight: '100vh' }}>
      <Row className="w-100 d-flex justify-content-center">
        <Col md={6}>
          <div className="card p-4">
            <h1 className="fs-3 fw-bold text-center">Excel</h1>
            <h2 className="mb-3 fs-4 text-center">Cargar un Excel de Asesores</h2>
            <p>(Ejemplo de columnas: Nombre, Matrícula, Carrera, Género)</p>

            {/* Cargar Excel */}
            <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label className="fw-bold">Selecciona el archivo Excel:</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control aria-describedby="basic-addon2" type="file" />
                  <Button variant="primary" id="button-addon2">
                    <BsUpload className="fs-5 me-2"></BsUpload>Cargar Excel
                  </Button>
                </InputGroup>
              </Form.Group>
            </Form>

            {/* Generar Reporte */}
            <h2 className="mb-2 mt-2 fs-4 text-center">Generar un reporte de Excel</h2>
            <p className="text-start">Esto lo genera y dejará descargar en una carpeta a tu elección</p>
            <div className="d-flex justify-content-center">
              <Button variant="success">
                <BsDownload className="fs-5 me-2"></BsDownload>Descargar Excel
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Excel;
