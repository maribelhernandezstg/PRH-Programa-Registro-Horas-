import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';
import { Filters } from '../components/Filters/Filters';
import { useState } from 'react';
import AdvisorTable from '../components/Tables/AdvisorTable';

const Advisees = () => {
  const [searchAsesorado] = useState('');
  const [searchMateria] = useState('');
  const [searchAsesor] = useState('');

  const registrosAsesorados = [
    {
      asesorado: 'Maria Lopez',
      matricula: '202321',
      carrera: 'LDS',
      genero: 'Femenino',
    },
    {
      asesorado: 'Carlos Perez',
      matricula: '202456',
      carrera: 'ITC',
      genero: 'Masculino',
    },
  ];

  const filteredRegistros = registrosAsesorados.filter(
    (registro) =>
      registro.asesorado
        .toLowerCase()
        .includes(searchAsesorado.toLowerCase()) &&
      registro.carrera.toLowerCase().includes(searchMateria.toLowerCase()) &&
      registro.matricula.toLowerCase().includes(searchAsesor.toLowerCase())
  );

  return (
    <Container className="window-container">
      <Row>
        <p className="title-container">Asesorados</p>
        <Filters />
        <Col>
          <div className="table-container">
            <AdvisorTable DataSource={filteredRegistros} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Advisees;
