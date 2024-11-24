import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { BsPencilSquare, BsXSquareFill } from 'react-icons/bs';
import { Advisee } from '../../shared/models/advisee.class';

interface AdviseeTableProps {
  DataSource: Advisee[];
  handleEditAdvisee: (advisee: Advisee) => void;
  handleToggleActivation: (enrollment: number, active: boolean) => void; // Nueva propiedad
}

const AdviseeTable: React.FC<AdviseeTableProps> = ({ DataSource, handleEditAdvisee, handleToggleActivation }) => {
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
                <Button className="button" onClick={() => handleEditAdvisee(register)}>
                  <BsPencilSquare className="fs-6" />
                </Button>{' '}
                {/* Botón de activar/desactivar */}
                <Button
                  className={register.Active ? 'btn btn-danger' : 'btn btn-primary'} // Aseguramos que los estilos sean de Bootstrap
                  onClick={() => handleToggleActivation(register.Enrollment, register.Active)}
                  title={register.Active ? 'Desactivar' : 'Activar'} // Tooltip descriptivo
                >
                  <BsXSquareFill className="fs-6" />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="fs-5 text-center">
              No se encontraron asesorados
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default AdviseeTable;
