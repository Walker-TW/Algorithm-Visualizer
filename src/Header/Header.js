import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export class Header extends Component {
  testDijkstra = () => {
    const { startNode, endNode } = this.props;
    console.log(this.props);
    console.log(startNode, "Look a start node");
    console.log(endNode, "Look an end node");
  };

  render() {
    return (
      <Button onClick={this.testDijkstra} variant="primary">
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
