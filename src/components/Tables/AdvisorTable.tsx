import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { BsPencilSquare, BsXSquareFill } from 'react-icons/bs';

interface AdvisorTableProps {
  DataSource: {
    Name: string;
    Enrollment: string;
    Gender: string;
    DegreeIdentity: string;
  }[];
}

const AdvisorTable: React.FC<AdvisorTableProps> = ({ DataSource }) => {
  return (
    <Table responsive striped bordered hover className="rounded-table text-center">
      <thead>
        <tr>
          <th className="text-center">Nombre</th>
          <th className="text-center">Matrícula</th>
          <th className="text-center">Carrera</th>
          <th className="text-center">Género</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {DataSource.length > 0 ? (
          DataSource.map((registro, index) => (
            <tr key={index} className="text-break align-middle">
              <td style={{ minWidth: 120, maxWidth: 165, height: 65 }}>{registro.Name}</td>
              <td style={{ minWidth: 100 }}>{registro.Enrollment}</td>
              <td style={{ minWidth: 100 }}>{registro.DegreeIdentity}</td>
              <td style={{ minWidth: 100 }}>{registro.Gender}</td>
              <td style={{ minWidth: 125 }}>
                <Button className="button">
                  <BsPencilSquare className="fs-6"></BsPencilSquare>
                </Button>{' '}
                <Button className="buttonRed">
                  <BsXSquareFill className="fs-6"></BsXSquareFill>
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="fs-5 text-center">
              No se encontraron asesores
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default AdvisorTable;
