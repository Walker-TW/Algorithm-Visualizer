import React, { Component } from "react";
import { Alert, Spinner, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { dijkstra } from "../Algorithms/dijkstra";

export class Header extends Component {
  testDijkstra = (grid, startNode, endNode) => {
    console.log(startNode);
    const start = grid[startNode.rowIndex][startNode.colIndex];
    const finish = grid[endNode.rowIndex][endNode.colIndex];
    dijkstra(grid, start, finish);
  };

  render() {
    const { grid, startNode, endNode } = this.props;
    if (startNode.rowIndex != null && endNode.rowIndex != null) {
      return (
        <Button
          onClick={() => this.testDijkstra(grid, startNode, endNode)}
          variant="primary"
        >
          Let's Run Dijkstra
        </Button>
      );
    } else {
      return <Alert variant="primary">Please Choose A Start & End Node</Alert>;
    }
  }
}

export default Header;

Header.propTypes = {
  startNode: PropTypes.object.isRequired,
  endNode: PropTypes.object.isRequired,
};
