import React, { Component } from "react";
import { Alert, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { dijkstra, findShortestPath } from "../Algorithms/dijkstra";

export class Header extends Component {
  testDijkstra = (grid, startNode, endNode) => {
    console.log(grid, "Your grid");
    console.log(startNode, "Your StartNode");
    console.log(endNode, "Your End Node");
    const start = grid[startNode.rowIndex][startNode.colIndex];
    const finish = grid[endNode.rowIndex][endNode.colIndex];
    const resultOfDijkstra = dijkstra(grid, start, finish);
    const y = findShortestPath(resultOfDijkstra[resultOfDijkstra.length - 1]);
    console.log(y, "These are the nodes that are the shortest path");
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
