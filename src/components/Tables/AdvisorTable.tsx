import React from 'react';
import { Table, Button } from 'react-bootstrap';

interface AdvisorTableProps {
  DataSource: {
    asesorado: string;
    matricula: string;
    carrera: string;
    genero: string;
  }[];
}

const AdvisorTable: React.FC<AdvisorTableProps> = ({ DataSource }) => {
  return (
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
        {DataSource.length > 0 ? (
          DataSource.map((registro, index) => (
            <tr key={index}>
              <td>{registro.asesorado}</td>
              <td>{registro.matricula}</td>
              <td>{registro.carrera}</td>
              <td>{registro.genero}</td>
              <td>
                <Button className="button">Editar</Button>{' '}
                <Button className="buttonRed">Borrar</Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="text-center">
              No se encontraron asesores
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default AdvisorTable;
