import React, { Component } from 'react';
import './Node.css';
import PropTypes from 'prop-types';

export default class Node extends Component {
  state = {
    isStart: false,
    isFinish: false,
  };

  clickHandler = () => {
    const { isStart, isFinish } = this.state;

    const { flagStart, flagFinish, gridId, updateNode } = this.props;

    if (!isStart && !isFinish) {
      this.setState({ isStart: true });
      flagStart(gridId);
      updateNode(gridId);
    } else if (isStart && !isFinish) {
      this.setState({ isStart: false, isFinish: true });
      flagFinish(gridId);
      updateNode(gridId);
    } else {
      this.setState({ isStart: false, isFinish: false });
      updateNode(gridId);
    }
  };

  render() {
    const classes = ['Node'];
    const { isStart, isFinish, visited } = this.state;

    if (isStart) {
      classes.push('start');
    } else if (isFinish) {
      classes.push('finish');
    } else if (visited) {
      classes.push('visited');
    }

    return <div onClick={this.clickHandler} className={classes.join(' ')} />;
  }
}

Node.propTypes = {
  gridId: PropTypes.object.isRequired,
  updateNode: PropTypes.func.isRequired,
  flagStart: PropTypes.func.isRequired,
  flagFinish: PropTypes.func.isRequired,
};
