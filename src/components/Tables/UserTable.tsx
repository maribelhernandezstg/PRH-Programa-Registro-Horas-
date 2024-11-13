import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { BsPencilSquare, BsXSquareFill, BsCheckCircle } from 'react-icons/bs';
import { User } from '../../shared/models/user.class';

interface UserTableProps {
  DataSource: User[];
  handleConfirmationModal: (title: string, message: string, show: boolean) => void;
  handleEditUser: (user: User) => void;
  handleSelectUserRemove: (user: User, isActivated: boolean) => void;
}

const UserTable: React.FC<UserTableProps> = (UserTableProps) => {
  const getTypeLabel = (type: number) => {
    switch (type) {
      case 1:
        return 'Admin';
      case 2:
        return 'Recepción';
      case 3:
        return 'Asesor';
      default:
        return 'Desconocido';
    }
  };

  return (
    <Table responsive striped bordered hover className="rounded-table text-center">
      <thead>
        <tr>
          <th className="text-center">Nombre</th>
          <th className="text-center">Matrícula</th>
          <th className="text-center">Tipo</th>
          <th className="text-center">Estado</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {UserTableProps.DataSource.length > 0 ? (
          UserTableProps.DataSource.map((register, index) => (
            <tr key={index} className="text-break align-middle">
              <td style={{ minWidth: 120, maxWidth: 165, height: 65 }}>{register.Name}</td>
              <td style={{ minWidth: 100 }}>{register.Enrollment}</td>
              <td style={{ minWidth: 100 }}>{getTypeLabel(register.Type)}</td>
              <td style={{ minWidth: 100 }}>{register.Active ? <p>Activo</p> : <p>Inactivo</p>}</td>
              <td style={{ minWidth: 125 }}>
                <Button className="button" style={{ width: 120 }} onClick={() => UserTableProps.handleEditUser(register)}>
                  <BsPencilSquare className="fs-6 me-1"></BsPencilSquare>Editar
                </Button>{' '}
                {register.Active ? (
                  <Button className="buttonRed" style={{ width: 120 }} onClick={() => UserTableProps.handleSelectUserRemove(register, false)}>
                    <BsXSquareFill className="fs-6 me-1"></BsXSquareFill>Desactivar
                  </Button>
                ) : (
                  <Button className="buttonGreen" style={{ width: 120 }} onClick={() => UserTableProps.handleSelectUserRemove(register, true)}>
                    <BsCheckCircle className="fs-6 me-1"></BsCheckCircle>Activar
                  </Button>
                )}
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

export default UserTable;
