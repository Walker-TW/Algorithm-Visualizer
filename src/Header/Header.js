import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class Header extends Component {
  testDijkstra = (startNode, endNode) => {
    console.log(this.props);
    console.log(startNode, 'Look a start node');
    console.log(endNode, 'Look an end node');
  };

  render() {
    const { startNode, endNode } = this.props;
    return (
      <Button
        onClick={() => this.testDijkstra(startNode, endNode)}
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
