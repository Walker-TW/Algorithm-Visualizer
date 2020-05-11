import React, { Component } from 'react';
import Node from './Node/Node';
import Header from '../Header/Header';
import { dijkstra } from './../Algorithms/Scratch';

import './Grid.css';

export default class Grid extends Component {
  state = {
    grid: [],
    start: {
      present: false,
      gridId: {
        rowIndex: 0,
        colIndex: 0,
      },
    },
    finish: {
      present: false,
      gridId: {
        rowIndex: 0,
        colIndex: 0,
      },
    },
  };

  // const { start.coordinates, finish.coordinates } = this.state
  // const { start, finish } = this.state

  // defineStart = (index) => {};

  componentDidMount() {
    this.setState({ grid: this.gridSetup() });
  }

  testDijkstra() {
    console.log(this.state);
    const startNode = this.start.coordinates;
  }

  testing = () => {
    console.log('x');
  };

  gridSetup = () => {
    let nodes = [];
    for (let row = 0; row < 50; row++) {
      let current_row = [];
      for (let col = 0; col < 30; col++) {
        current_row.push([]);
      }
      nodes.push(current_row);
    }
    return nodes;
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

  render() {
    const { grid, start, finish } = this.state;
    return (
      <div className="Grid">
        <div className="Button">
          <Header startNode={start.gridId} endNode={finish.gridId} />
        </div>
        <br />
        {grid.map((row, colIndex) => {
          return (
            <div className="Column" key={colIndex.toString()}>
              {row.map((col, rowIndex) => (
                <Node
                  key={colIndex.toString() + ' ' + rowIndex.toString()}
                  gridId={{ rowIndex: rowIndex, colIndex: colIndex }}
                  flagStart={this.startNodeFlag}
                  flagFinish={this.finishNodeFlag}
                />
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}
