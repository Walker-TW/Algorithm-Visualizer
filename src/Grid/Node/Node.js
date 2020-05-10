import React, { Component } from "react";
import "./Node.css";
import PropTypes from "prop-types";

export default class Node extends Component {
  state = {
    start: false,
    finish: false,
    distance: Infinity,
    visited: false,
  };

  clickHandler = () => {
    const { start, finish } = this.state;
    const { flagStart, flagFinish, gridId } = this.props;
    if (!start && !finish) {
      this.setState({ start: true });
      flagStart(gridId);
    } else if (start && !finish) {
      this.setState({ start: false, finish: true });
      flagFinish(gridId);
    } else {
      this.setState({ start: false, finish: false });
    }
  };

  // downHandler = () => {
  //   const { start, finish, visited } = this.state;

  //   if (!start && !finish) {
  //     this.setState({ start: true });
  //   } else if (start && !finish) {
  //     this.setState({ finish: false });
  //   } else {
  //     this.setState({ start: false, finish: false });
  //   }
  // };

  render() {
    const classes = ["Node"];
    const { start, finish, visited } = this.state;

    if (start) {
      classes.push("start");
    } else if (finish) {
      classes.push("finish");
    } else if (visited) {
      classes.push("visited");
    }

    return (
      <div
        // onMouseDown={() => this.downHandler()}
        onClick={this.clickHandler}
        className={classes.join(" ")}
      ></div>
    );
  }
}

Node.propTypes = {
  gridId: PropTypes.object.isRequired,
  flagStart: PropTypes.func.isRequired,
  flagFinish: PropTypes.func.isRequired,
};
//
