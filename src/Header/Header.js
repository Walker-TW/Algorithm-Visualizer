import React, { Component } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

export class Header extends Component {
  testDijkstra = (grid, startNode, endNode) => {
    const start = grid[startNode.rowIndex][startNode.colIndex];
    const end = grid[endNode.rowIndex][endNode.colIndex];
    console.log(start);
    console.log(end);
  };

  render() {
    const { grid, startNode, endNode } = this.props;
    return (
      <Button
        onClick={() => this.testDijkstra(grid, startNode, endNode)}
        variant="primary"
      >
        Let's Run Dijkstra
      </Button>
    );
  }
}

export default Header;

Header.propTypes = {
  startNode: PropTypes.object.isRequired,
  endNode: PropTypes.object.isRequired,
};
