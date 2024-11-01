import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { BsPencilSquare, BsXSquareFill, BsCheckCircle } from 'react-icons/bs';

interface UserTableProps {
  DataSource: {
    Name: string;
    Enrollment: string;
    Active: boolean;
  }[];
  toggleUserStatus: (enrollment: string) => void;
}

const UserTable: React.FC<UserTableProps & { handleEditUser: (usuario: { Name: string; Enrollment: string; Active: boolean }) => void }> = ({ DataSource, toggleUserStatus, handleEditUser }) => {
  return (
    <Table responsive striped bordered hover className="rounded-table text-center">
      <thead>
        <tr>
          <th className="text-center">Nombre</th>
          <th className="text-center">Matrícula</th>
          <th className="text-center">Estado</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {DataSource.length > 0 ? (
          DataSource.map((registro, index) => (
            <tr key={index} className="text-break align-middle">
              <td style={{ minWidth: 120, maxWidth: 165, height: 65 }}>{registro.Name}</td>
              <td style={{ minWidth: 100 }}>{registro.Enrollment}</td>
              <td style={{ minWidth: 100 }}>{registro.Active ? <p>Activo</p> : <p>Inactivo</p>}</td>
              <td style={{ minWidth: 125 }}>
                <Button className="button" style={{ width: 120 }} onClick={() => handleEditUser(registro)}>
                  <BsPencilSquare className="fs-6 me-1"></BsPencilSquare>Editar
                </Button>{' '}
                {registro.Active ? (
                  <Button className="buttonRed" style={{ width: 120 }} onClick={() => toggleUserStatus(registro.Enrollment)}>
                    <BsXSquareFill className="fs-6 me-1"></BsXSquareFill>Desactivar
                  </Button>
                ) : (
                  <Button className="buttonGreen" style={{ width: 120 }} onClick={() => toggleUserStatus(registro.Enrollment)}>
                    <BsCheckCircle className="fs-6 me-1"></BsCheckCircle>Activar
                  </Button>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="fs-5 text-center">
              No se encontraron asesores
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default UserTable;
