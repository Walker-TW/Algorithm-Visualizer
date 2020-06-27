import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import "./Node.css";
import './NodeTron.css';
// import './AnimatedNode.css';
class Node extends Component {
  state = {
    start: false,
    finish: false,
    fence: false,
  };

  // start and end points are not adjustable
  // at the moment so they have a seperate handler

  startFinishHandler = (type) => {
    const { gridId, nodeFlag } = this.props;
    nodeFlag(gridId, [type]);
    this.setState({ [type]: true });
  };

  fenceHandler = () => {
    const { gridId, nodeFlag } = this.props;
    const { fence, start, finish } = this.state;

    if (!start && !finish) nodeFlag(gridId, 'fence');
    this.setState({ fence: !fence });
  };

  mouseUpHandler = () => {
    const { mouseFlag, mouseToggle, fenceToggle } = this.props;

    if (fenceToggle && mouseToggle) mouseFlag();
  };

  mouseEnterHandler = () => {
    const { mouseToggle, fenceToggle } = this.props;

    if (fenceToggle && mouseToggle) this.fenceHandler();
  };

  mouseDownHandler = () => {
    const { mouseToggle, mouseFlag, fenceToggle } = this.props;
    if (fenceToggle && !mouseToggle) {
      mouseFlag();
      this.fenceHandler();
    } else {
      this.clickHandler();
    }
  };

  clickHandler = () => {
    const { gridHasStart, gridHasFinish, resetStartFinish } = this.props;
    const { start, finish } = this.state;

    if (gridHasStart && gridHasFinish) {
      // visual aid
      document.getElementById('run-btn').innerText = 'Click Me!';

      let reset = start ? 'start' : finish ? 'finish' : null;

      if (start || finish) resetStartFinish(reset);
    } else if (!gridHasStart) {
      if (finish) alert("Start and end can't be the same");
      else this.startFinishHandler('start');
    } else if (gridHasStart && !gridHasFinish) {
      if (start) {
        alert("Start and end can't be the same");
      } else {
        this.startFinishHandler('finish');
      }
    }
  };

  render() {
    const { start, finish, fence } = this.state;
    const { size } = this.props;
    return (
      <div
        onMouseDown={this.mouseDownHandler}
        onMouseEnter={this.mouseEnterHandler}
        onMouseUp={this.mouseUpHandler}
        style={
          size === 0 ? null : { width: parseInt(size), height: parseInt(size) }
        }
        className={`Node ${
          start ? 'start' : finish ? 'finish' : fence ? 'fence' : ''
        }`}
        id={this.props.id}
      />
    );
  }
}

export { Node };

Node.propTypes = {
  fenceToggle: PropTypes.bool.isRequired,
  gridId: PropTypes.object.isRequired,
  gridHasStart: PropTypes.bool.isRequired,
  gridHasFinish: PropTypes.bool.isRequired,
  mouseFlag: PropTypes.func.isRequired,
  mouseToggle: PropTypes.bool.isRequired,
  nodeFlag: PropTypes.func.isRequired,
  resetStartFinish: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
};
