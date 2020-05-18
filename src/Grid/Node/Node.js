import React, { Component } from 'react';
import './Node.css';
import PropTypes from 'prop-types';

export default class Node extends Component {
  state = {
    start: false,
    finish: false,
    fence: false,
  };

  clickHandler = () => {
    const {
      gridId,
      gridHasStart,
      gridHasFinish,
      gridHasFenceToggle,
      nodeFlag,
    } = this.props;

    if (gridHasStart && gridHasFinish && !gridHasFenceToggle) {
      document.getElementById('button').innerText = 'Click Me';
    } else {
      if (!gridHasStart) {
        nodeFlag(gridId, 'start');
        this.setState({ start: true });
      } else if (!gridHasFinish) {
        this.setState({ finish: true });
        nodeFlag(gridId, 'finish');
      }
    }
  };

  fenceSelector = (e) => {
    const { gridId, nodeFlag } = this.props;
    const { fence, start, finish } = this.state;
    if (fence === false && start === false && finish === false) {
      nodeFlag(gridId, 'fence');
      this.setState({ fence: true });
    } else {
      nodeFlag(gridId, 'fence');
      this.setState({ fence: false });
    }
  };

  mouseUpHandler = () => {
    const { mouseFlag, mouseToggle, gridHasFenceToggle } = this.props;
    if (gridHasFenceToggle === true && mouseToggle === true) {
      mouseFlag();
    }
  };

  mouseEnterHandler = () => {
    const { mouseToggle, gridHasFenceToggle } = this.props;
    if (gridHasFenceToggle === true && mouseToggle === true) {
      this.fenceSelector();
    }
  };

  mouseDownHandler = () => {
    const { mouseToggle, mouseFlag, gridHasFenceToggle } = this.props;
    if (gridHasFenceToggle === true && mouseToggle === false) {
      mouseFlag();
      this.fenceSelector();
    } else {
      this.clickHandler();
    }
  };

  render() {
    const { start, finish, fence } = this.state;
    return (
      <div
        onMouseDown={this.mouseDownHandler}
        onMouseEnter={this.mouseEnterHandler}
        onMouseUp={this.mouseUpHandler}
        className={`Node ${
          start ? 'start' : finish ? 'finish' : fence ? 'fence' : ''
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
  gridHasFenceToggle: PropTypes.bool.isRequired,

  // reset: PropTypes.func.isRequired,
};
