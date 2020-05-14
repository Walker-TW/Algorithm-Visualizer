import React, { Component } from 'react';
import './Node.css';
import PropTypes from 'prop-types';

export default class Node extends Component {
  state = {
    isStart: false,
    isFinish: false,
  };

  clickHandler = () => {
    const {
      gridId,
      gridHasStart,
      gridHasFinish,
      flagStart,
      flagFinish,
      updateNode,
      reset,
    } = this.props;

    if (!gridHasStart) {
      this.setState({ isStart: true });
      flagStart(gridId);
      // updateNode(gridId);
    } else if (gridHasStart && !gridHasFinish) {
      this.setState({ isFinish: true });
      flagFinish(gridId);
      // updateNode(gridId);
    } else {
      this.setState({ isStart: false, isFinish: false });
      // updateNode(gridId);
      reset();
    }
    updateNode(gridId);
  };

  render() {
    return (
      <div
        onClick={this.clickHandler}
        className={this.props.nodeStyle}
        id={this.props.id}
      />
    );
  }
}

Node.propTypes = {
  gridId: PropTypes.object.isRequired,
  updateNode: PropTypes.func.isRequired,
  flagStart: PropTypes.func.isRequired,
  flagFinish: PropTypes.func.isRequired,
  gridHasStart: PropTypes.bool.isRequired,
  gridHasFinish: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  nodeStyle: PropTypes.string.isRequired,
};
