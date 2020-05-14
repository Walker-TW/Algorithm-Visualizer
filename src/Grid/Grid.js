import React, { Component } from 'react';
import Node from './Node/Node';
import Header from '../Header/Header';

import './Grid.css';

export default class Grid extends Component {
  state = {
    grid: [],
    start: {
      present: false,
      gridId: {
        rowIndex: null,
        colIndex: null,
      },
    },
    finish: {
      present: false,
      gridId: {
        rowIndex: null,
        colIndex: null,
      },
    },
  };

  componentDidMount() {
    this.gridSetup();
  }

  createNode = (gridId) => {
    return {
      gridId,
      isStart: false,
      isFinish: false,
      distance: Infinity,
      visited: false,
      pastNode: null,
    };
  };

  gridSetup = () => {
    let grid = [];
    for (let colIndex = 0; colIndex < 10; colIndex++) {
      let current_row = [];
      for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
        const gridId = { rowIndex, colIndex };
        current_row.push(this.createNode(gridId));
      }
      grid.push(current_row);
    }
    this.setState({ grid: grid });
  };

  startNodeFlag = (gridId) => {
    this.setState({
      start: {
        present: true,
        gridId: gridId,
      },
    });
  };

  finishNodeFlag = (gridId) => {
    this.setState({
      finish: {
        present: true,
        gridId: gridId,
      },
    });
  };

  updateNode = (gridId) => {
    const { grid, start, finish } = this.state;
    const { rowIndex, colIndex } = gridId;
    const node = grid[rowIndex][colIndex];

    if (!start.present && !finish.present) {
      this.startNodeFlag(gridId);
      node.isStart = true;
      node.isFinish = false;
    } else if (start.present && !finish.present) {
      this.finishNodeFlag(gridId);
      node.isStart = false;
      node.isFinish = true;
    } else {
      node.isStart = false;
      node.isFinish = false;
    }
  };

  resetStartFinish = () => {
    this.setState({
      start: { ...this.state.start, present: false },
      finish: { ...this.state.finish, present: false },
    });
  };

  render() {
    const { grid, start, finish } = this.state;

    const nodes = grid.map((row, colIndex) => {
      return (
        <div className="Column" key={colIndex.toString()}>
          {row.map((node, rowIndex) => (
            <Node
              key={colIndex.toString() + ' ' + rowIndex.toString()}
              gridId={node.gridId}
              gridHasStart={start.present}
              gridHasFinish={finish.present}
              flagStart={this.startNodeFlag}
              flagFinish={this.finishNodeFlag}
              updateNode={this.updateNode}
              reset={this.resetStartFinish}
            />
          ))}
        </div>
      );
    });

    return (
      <div className="Grid">
        <div className="Button">
          <Header
            grid={grid}
            startNode={start.gridId}
            endNode={finish.gridId}
          />
        </div>
        {nodes}
      </div>
    );
  }
}
