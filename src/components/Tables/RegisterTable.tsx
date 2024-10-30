import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { BsPencilSquare, BsXSquareFill } from 'react-icons/bs';

interface RegisterTableProps {
  DataSource: {
    Name: string;
    Enrollment: string;
    Active: boolean;
  }[];
}



const RegisterTable: React.FC<RegisterTableProps> = ({ DataSource }) => {
  return (
    <Table striped bordered hover className="mt-4 rounded-table text-center">
      <thead>
        <tr className="fs-6 fw-bold">
          <th className="text-center">Nombre</th>
          <th className="text-center">Matrícula</th>
          <th className="text-center">Estado</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {DataSource.length > 0 ? (
          DataSource.map((registro, index) => (
            <tr key={index}>
              <td>{registro.Name}</td>
              <td>{registro.Enrollment}</td>
              <td>{registro.Active ? (
                <p>Activo</p>
              ) : (
                <p>Inactivo</p>
              )}</td>
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
              No se encontraron asesores
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default RegisterTable;