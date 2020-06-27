import React from 'react';
import { Table } from 'react-bootstrap';
import './Stats.css';

const Stats = ({ runtime, nodesProccessed, fastestPath, algorithmRan }) => {
  return (
    <Table striped bordered hover variant="dark" size="sm">
      <tbody>
        <tr>
          <th>Algorithm</th>
          <th>Runtime (Microseconds)</th>
          <th>Nodes Processed</th>
          <th>Fastest Path Total</th>
        </tr>
        <tr>
          <td>{algorithmRan}</td>
          <td>{runtime}</td>
          <td>{nodesProccessed}</td>
          <td>{fastestPath}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export { Stats };
