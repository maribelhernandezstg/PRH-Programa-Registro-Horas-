import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { BsPencilSquare, BsXSquareFill } from 'react-icons/bs';
import { AdvisorySession } from '../../shared/models/advisory-session.class';

interface AdviceTableProps {
  DataSource: AdvisorySession[];
  handleEditAdvice: (advice: AdvisorySession) => void;
  handleToggleActivation: (identity: number, active: boolean) => void;
}

const AdviceTable: React.FC<AdviceTableProps> = ({ DataSource, handleEditAdvice, handleToggleActivation }) => {
  return (
    <Table responsive striped bordered hover className="rounded-table text-center">
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
          DataSource.map((register, index) => (
            <tr key={index} className="text-break align-middle">
              <td style={{ minWidth: 120, maxWidth: 165, height: 65 }}>{register.advisee.Name}</td>
              <td style={{ minWidth: 100 }}>{register.advisee.Enrollment}</td>
              <td style={{ minWidth: 110, maxWidth: 145 }}>{register.learningUnit.Name}</td>
              <td style={{ minWidth: 100, maxWidth: 145 }}>{register.Topic}</td>
              <td style={{ minWidth: 100 }}>
                {register.StartTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td style={{ minWidth: 100 }}>
                {register.EndTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td style={{ minWidth: 120, maxWidth: 165 }}>{register.AdvisorIdentity}</td>
              <td style={{ minWidth: 125 }}>
                <Button className="button" onClick={() => handleEditAdvice(register)}>
                  <BsPencilSquare className="fs-6" />
                </Button>{' '}
                <Button
                  className={`btn ${register.Active ? 'btn-danger' : 'btn-primary'}`} // Rojo si está activo, azul si está inactivo
                  onClick={() => handleToggleActivation(register.Identity, register.Active)}
                  title={register.Active ? 'Desactivar' : 'Activar'}>
                  <BsXSquareFill className="fs-6" />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={8} className="fs-6 fw-bold text-center">
              No se encontraron asesorías
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default AdviceTable;
