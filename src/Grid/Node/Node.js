import React, { Component } from 'react';
import './Node.css';
import PropTypes from 'prop-types';

export default class Node extends Component {
  state = {
    isStart: false,
    isFinish: false,
  };

  // // click handler has to update the object and the
  // clickHandler = (e) => {
  //   const { start, finish } = this.state;
  //   const { flagStart, gridId } = this.props;
  //   if (!start && !finish) {
  //     this.setState({ start: true });
  //     flagStart(gridId);
  //   } else {
  //     this.setState({ start: false, finish: false });
  //   }
  // };

  // contextMenuHandler = (e) => {
  //   e.preventDefault();
  //   console.log('Right click baybee');
  //   const { finish } = this.state;
  //   const { flagFinish, gridId } = this.props;
  //   if (!finish) {
  //     this.setState({ start: false, finish: true });
  //     flagFinish(gridId);
  //   } else {
  //     this.setState({ start: false, finish: false });
  //   }
  // };

  clickHandler = (e) => {
    const { isStart, isFinish } = this.state;

    const {
      flagStart,
      flagFinish,
      gridId,
      updateNode,
      start,
      finish,
    } = this.props;

    console.log(start, finish, 'start/finish');
    if (!isStart && !isFinish && !start.present) {
      this.setState({ isStart: true, isFinish: false });
      flagStart(gridId);
      updateNode(gridId);
    } else if (isStart && !isFinish && start.present && !finish.present) {
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

    return (
      <div onClick={() => this.clickHandler} className={classes.join(' ')} />
    );
  }
}

Node.propTypes = {
  gridId: PropTypes.object.isRequired,
  updateNode: PropTypes.func.isRequired,
  flagStart: PropTypes.func.isRequired,
  flagFinish: PropTypes.func.isRequired,
  start: PropTypes.object.isRequired,
  finish: PropTypes.object.isRequired,
};
