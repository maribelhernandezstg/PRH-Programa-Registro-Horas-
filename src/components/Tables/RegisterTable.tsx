import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { BsPencilSquare, BsXSquareFill } from 'react-icons/bs';

interface RegisterTableProps {
  DataSource: {
    Name: string;
    Enrollment: string;
    Active: boolean;
  }[];
  toggleUserStatus: (enrollment: string) => void;
}



const RegisterTable: React.FC<RegisterTableProps & { handleEditUser: (usuario: { Name: string; Enrollment: string; Active: boolean }) => void; } > = ({ DataSource, toggleUserStatus, handleEditUser  }) => {
  return (
    <div className='table-responsive'>
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
                <Button className="button text-center m-1" style={{ minWidth: '125px' }} onClick={() => handleEditUser(registro)}>
                  <BsPencilSquare className="fs-5 m-1"></BsPencilSquare>Editar
                </Button>{' '}
                <Button className="buttonRed text-start m-1" style={{ minWidth: '125px' }} onClick={() => toggleUserStatus(registro.Enrollment)}>
                  <BsXSquareFill className="fs-5 m-1"></BsXSquareFill>
                  {registro.Active ? (
                <>Desactivar</>
              ) : (
                <>Activar</>
              )}
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
    </div>
  );
};

export default RegisterTable;