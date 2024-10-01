// src/components/AsesoresTable.tsx

import React from 'react';
import { Table, Button } from "react-bootstrap";

const AsesoresTable = ({ registros }) => {
  return (
    <Table striped bordered hover className="mt-4 rounded-table">
      <thead>
        <tr>
          <th>Asesorado</th>
          <th>Matrícula</th>
          <th>Carrera</th>
          <th>Género</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {registros.length > 0 ? (
          registros.map((registro, index) => (
            <tr key={index}>
              <td>{registro.asesorado}</td>
              <td>{registro.matricula}</td>
              <td>{registro.carrera}</td>
              <td>{registro.genero}</td>
              <td>
                <Button className="button">Editar</Button>{" "}
                <Button className="buttonRed">Borrar</Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              No se encontraron registros
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default AsesoresTable;
