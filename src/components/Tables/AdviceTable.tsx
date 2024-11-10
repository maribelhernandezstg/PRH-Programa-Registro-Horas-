import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { BsPencilSquare, BsXSquareFill } from 'react-icons/bs';

interface SimplifiedAdvice {
  AdvisorIdentity: string;
  AdviseeIdentity: string;
  AdviseeStudentId: string;
  LearningUnitIdentity: string;
  Topic: string;
  StartTime: Date;
  EndTime: Date;
}

interface AdviceTableProps {
  DataSource: SimplifiedAdvice[];
  onEdit: (advice: SimplifiedAdvice) => void;
}

const AdviceTable: React.FC<AdviceTableProps> = ({ DataSource, onEdit }) => {
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
          DataSource.map((registro, index) => (
            <tr key={index} className="text-break align-middle">
              <td style={{ minWidth: 120, maxWidth: 165, height: 65 }}>{registro.AdviseeIdentity}</td>
              <td style={{ minWidth: 100 }}>{registro.AdviseeStudentId}</td>
              <td style={{ minWidth: 110, maxWidth: 145 }}>{registro.LearningUnitIdentity}</td>
              <td style={{ minWidth: 100, maxWidth: 145 }}>{registro.Topic}</td>
              <td style={{ minWidth: 100 }}>
                {registro.StartTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td style={{ minWidth: 100 }}>
                {registro.EndTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td style={{ minWidth: 120, maxWidth: 165 }}>{registro.AdvisorIdentity}</td>
              <td style={{ minWidth: 125 }}>
                <Button className="button" onClick={() => onEdit(registro)}>
                  <BsPencilSquare className="fs-6" />
                </Button>{' '}
                <Button className="buttonRed">
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
