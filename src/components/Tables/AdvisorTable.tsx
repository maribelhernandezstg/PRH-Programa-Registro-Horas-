import React from "react";
import { Table, Button } from "react-bootstrap";
import { BsPencilSquare, BsXSquareFill } from "react-icons/bs";

interface SimplifiedAdvisor {
  Name: string;
  Enrollment: number;
  Gender: string;
  DegreeIdentity: string;
}

interface AdvisorTableProps {
  DataSource: SimplifiedAdvisor[]; // Cambiar DataSource a SimplifiedAdvisor[]
  onEdit: (advisor: SimplifiedAdvisor) => void; // Cambiar tipo de parámetro en onEdit
}

const AdvisorTable: React.FC<AdvisorTableProps> = ({ DataSource, onEdit }) => {
  return (
    <Table
      responsive
      striped
      bordered
      hover
      className="rounded-table text-center"
    >
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
              <td style={{ minWidth: 120, maxWidth: 165, height: 65 }}>
                {registro.Name}
              </td>
              <td style={{ minWidth: 100 }}>{registro.Enrollment}</td>
              <td style={{ minWidth: 100 }}>{registro.DegreeIdentity}</td>
              <td style={{ minWidth: 100 }}>{registro.Gender}</td>
              <td style={{ minWidth: 125 }}>
                <Button className="button" onClick={() => onEdit(registro)}>
                  <BsPencilSquare className="fs-6" />
                </Button>{" "}
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
