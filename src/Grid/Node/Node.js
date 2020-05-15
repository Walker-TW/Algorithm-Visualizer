import React, { Component } from 'react';
import './Node.css';
import PropTypes from 'prop-types';

export default class Node extends Component {
  state = {
    start: false,
    finish: false,
  };

  clickHandler = () => {
    const { gridId, gridHasStart, gridHasFinish, nodeFlag } = this.props;

    if (gridHasStart && gridHasFinish) {
      document.getElementById('button').className = 'btn btn-primary big';
    } else {
      if (!gridHasStart) {
        nodeFlag(gridId, 'start');
        this.setState({ start: true });
      } else {
        this.setState({ finish: true });
        nodeFlag(gridId, 'finish');
      }
      // if (!gridHasStart) {
      //   nodeFlag(gridId, 'start');
      //   this.setState({ start: true });
      // } else if (gridHasStart && !gridHasFinish) {
      //   this.setState({ finish: true });
      //   nodeFlag(gridId, 'finish');
      // } else {
      //   this.setState({ start: false, finish: false });
      //   reset();
      // }
    }
  };

  render() {
    return (
      <div
        onClick={this.clickHandler}
        className={`Node ${
          this.state.start ? 'start' : this.state.finish ? 'finish' : ''
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
