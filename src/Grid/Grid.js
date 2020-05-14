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
    this.setState({ grid: this.gridSetup() });
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
    for (let col = 0; col < 10; col++) {
      let current_row = [];
      for (let row = 0; row < 10; row++) {
        const gridId = { rowIndex: row, colIndex: col };
        current_row.push(this.createNode(gridId));
      }
      grid.push(current_row);
    }
    return grid;
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

    const node = grid[gridId.rowIndex][gridId.colIndex];

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
    console.log(this.state);
  };

  render() {
    const { grid, start, finish } = this.state;
    return (
      <div className="Grid">
        <div className="Button">
          <Header
            grid={grid}
            startNode={start.gridId}
            endNode={finish.gridId}
          />
        </div>

        {grid.map((row, colIndex) => {
          return (
            <div className="Column" key={colIndex.toString()}>
              {row.map((node, rowIndex) => (
                <Node
                  key={colIndex.toString() + ' ' + rowIndex.toString()}
                  gridId={node.gridId}
                  updateNode={this.updateNode}
                  flagStart={this.startNodeFlag}
                  flagFinish={this.finishNodeFlag}
                  start={start}
                  finish={finish}
                  reset={this.resetStartFinish}
                />
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}
