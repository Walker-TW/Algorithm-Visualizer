import React, { Component } from "react";
import "./Node.css";
import PropTypes from "prop-types";

export default class Node extends Component {
  state = {
    start: false,
    finish: false,
    fence: false,
  };

  clickHandler = () => {
    const { gridId, gridHasStart, gridHasFinish, nodeFlag } = this.props;

    if (gridHasStart && gridHasFinish) {
      document.getElementById("button").className = "btn btn-primary big";
      // this.wallSelector();
    } else {
      if (!gridHasStart) {
        nodeFlag(gridId, "start");
        this.setState({ start: true });
      } else {
        this.setState({ finish: true });
        nodeFlag(gridId, "finish");
      }
    }
  };

  wallSelector = (e) => {
    console.log("Right click baybee");
    const { gridId, nodeFlag } = this.props;
    const { fence } = this.state;
    if (fence === false) {
      nodeFlag(gridId, "fence");
      this.setState({ fence: true });
    } else {
      nodeFlag(gridId, "fence");
      this.setState({ fence: false });
    }
  };

  render() {
    return (
      <div
        onClick={this.clickHandler}
        // onTouchStart={this.clickHandler}
        onMouseEnter={this.wallSelector}
        className={`Node ${
          this.state.start
            ? "start"
            : this.state.finish
            ? "finish"
            : this.state.fence
            ? "fence"
            : ""
        }`}
        id={this.props.id}
      />
    );
  }
}

Node.propTypes = {
  gridId: PropTypes.object.isRequired,
  nodeFlag: PropTypes.func.isRequired,
  gridHasStart: PropTypes.bool.isRequired,
  gridHasFinish: PropTypes.bool.isRequired,
  // reset: PropTypes.func.isRequired,
};
