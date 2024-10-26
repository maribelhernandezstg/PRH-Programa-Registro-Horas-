import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { BsPencilSquare, BsXSquareFill } from 'react-icons/bs';

interface AdviceTableProps {
  DataSource: {
    AdvisorIdentity: string;
    AdviseeIdentity: string;
    AdviseeStudentId: string;
    LearningUnitIdentity: string;
    Topic: string;
    StartTime: Date;
    EndTime: Date;
  }[];
}

const AdviceTable: React.FC<AdviceTableProps> = ({ DataSource }) => {
  return (
    <Table striped bordered hover className="mt-4 rounded-table text-center">
      <thead>
        <tr>
          <th className="text-center">Asesorado</th>
          <th className="text-center">Matrícula</th>
          <th className="text-center">Materia</th>
          <th className="text-center">Tema</th>
          <th className="text-center">Inicio</th>
          <th className="text-center">Fin</th>
          <th className="text-center">Asesor</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {DataSource.length > 0 ? (
          DataSource.map((registro, index) => (
            <tr key={index}>
              <td>{registro.AdviseeIdentity}</td>
              <td>{registro.AdviseeStudentId}</td>
              <td>{registro.LearningUnitIdentity}</td>
              <td>{registro.Topic}</td>
              <td>{registro.StartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
              <td>{registro.EndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
              <td>{registro.AdvisorIdentity}</td>
              <td>
                <Button className="button">
                  <BsPencilSquare className="fs-5 me-1"></BsPencilSquare>Editar
                </Button>{' '}
                <Button className="buttonRed">
                  <BsXSquareFill className="fs-5 me-1"></BsXSquareFill>
                  Borrar
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="text-center">
              No se encontraron asesorías
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default AdviceTable;
