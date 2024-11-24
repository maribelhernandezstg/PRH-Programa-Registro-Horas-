import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { BsPencilSquare, BsXSquareFill } from 'react-icons/bs';
import { Advisor } from '../../shared/models/advisor.class';

interface AdvisorTableProps {
  DataSource: Advisor[];
  handleEditAdvisor: (advisor: Advisor) => void;
  handleToggleActivation: (enrollment: number, active: boolean) => void;
}

const AdvisorTable: React.FC<AdvisorTableProps> = ({ DataSource, handleEditAdvisor, handleToggleActivation }) => {
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
          DataSource.map((register, index) => (
            <tr key={index} className="text-break align-middle">
              <td style={{ minWidth: 120, maxWidth: 165, height: 65 }}>{register.Name}</td>
              <td style={{ minWidth: 100 }}>{register.Enrollment}</td>
              <td style={{ minWidth: 100 }}>{register.degree.ShortName}</td>
              <td style={{ minWidth: 100 }}>{register.Gender}</td>
              <td style={{ minWidth: 125 }}>
                {/* Botón de editar */}
                <Button className="button" onClick={() => handleEditAdvisor(register)}>
                  <BsPencilSquare className="fs-6" />
                </Button>{' '}
                {/* Botón de activar/desactivar */}
                <Button
                  className={`btn ${register.Active ? 'btn-danger' : 'btn-primary'}`} // Rojo si está activo, azul si está inactivo
                  onClick={() => handleToggleActivation(register.Enrollment, register.Active)}
                  title={register.Active ? 'Desactivar' : 'Activar'} 
                >
                  <BsXSquareFill className="fs-6" />
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
