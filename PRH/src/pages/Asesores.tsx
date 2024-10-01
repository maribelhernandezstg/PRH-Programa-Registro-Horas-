import { Container, Row, Col, Table, Button } from "react-bootstrap";
import '../components/tables/Styles.css';  // Asegúrate de que la ruta sea correcta

const Asesores = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Bienvenido a Asesores</h1>
          
          {/* Agregar el contenedor redondeado */}
          <div className="table-container">  {/* Nueva clase aquí */}
            <Table striped bordered hover className="mt-4 rounded-table">
              <thead>
                <tr>
                  <th>Asesorado</th>
                  <th>Matrícula</th>
                  <th>Carrera</th>
                  <th>Género</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Edson Eduardo</td>
                  <td>197215</td>
                  <td>LMAD</td>
                  <td>Masculino</td>
                  <td>
                    <Button className="button">Editar</Button>{" "}
                    <Button className="buttonRed">Borrar</Button>
                  </td>
                </tr>
                <tr>
                  <td>Kevin Sanchez</td>
                  <td>111121212</td>
                  <td>LMAD</td>
                  <td>Masculino</td>
                  <td>
                    <Button className="button">Editar</Button>{" "}
                    <Button className="buttonRed">Borrar</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          {/* Fin del contenedor redondeado */}
          
        </Col>
      </Row>
    </Container>
  );
};

export default Asesores;
