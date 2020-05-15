import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Node from './Node/Node';
import Header from './Header/Header';
import { Alert } from 'react-bootstrap';
import Info from './Info/Info';
import { dijkstra, findShortestPath } from '../Algorithms/dijkstra';

import './Grid.css';
import './Node/Node.css';

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
      start: false,
      finish: false,
      distance: Infinity,
      visited: false,
      pastNode: null,
    };
  };

  gridSetup = () => {
    const { width, height } = this.props.view;

    let grid = [];
    for (let rowIndex = 0; rowIndex < width; rowIndex++) {
      let current_row = [];
      for (let colIndex = 0; colIndex < height; colIndex++) {
        const gridId = { colIndex, rowIndex };

        current_row.push(this.createNode(gridId));
      }
      grid.push(current_row);
    }

    this.setState({ grid });
  };

  nodeFlag = (gridId, type) => {
    const { grid } = this.state;
    const { rowIndex, colIndex } = gridId;
    const node = grid[rowIndex][colIndex];

    node[type] = true;
    this.setState({
      [type]: {
        present: true,
        gridId: gridId,
      },
    });
  };

  // commented out as it is currently unnecessary, may be useful later
  // resetStartFinish = () => {
  //   this.setState({
  //     start: { ...this.state.start, present: false },
  //     finish: { ...this.state.finish, present: false },
  //   });
  // };

  runDijkstra = () => {
    const { grid, start, finish } = this.state;

    const startNode = grid[start.gridId.rowIndex][start.gridId.colIndex];
    const finishNode = grid[finish.gridId.rowIndex][finish.gridId.colIndex];
    const resultOfDijkstra = dijkstra(grid, startNode, finishNode);
    const y = findShortestPath(resultOfDijkstra[resultOfDijkstra.length - 1]);

    this.animateAlgorithm(resultOfDijkstra, y);
  };

  animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(
          `node-${node.gridId.colIndex}-${node.gridId.rowIndex}`
        ).className = `Node ${
          node.start
            ? 'start'
            : node.finish
            ? 'finish'
            : node.visited
            ? 'visited'
            : ''
        }`;
      }, 10 * i);
    }
  };

  animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(
          `node-${node.gridId.colIndex}-${node.gridId.rowIndex}`
        ).className = 'Node path';
      }, 50 * i);
    }
  };

  render() {
    const { grid, start, finish } = this.state;

    const nodes = grid.map((row, colIndex) => {
      return (
        <div className="Column" key={colIndex.toString()}>
          {row.map((node, rowIndex) => (
            <Node
              key={colIndex.toString() + ' ' + rowIndex.toString()}
              id={`node-${node.gridId.colIndex}-${node.gridId.rowIndex}`}
              gridId={node.gridId}
              gridHasStart={start.present}
              gridHasFinish={finish.present}
              nodeFlag={this.nodeFlag}
              updateNode={this.updateNode}
              // reset={this.resetStartFinish}
            />
          ))}
        </div>
      );
    });

    return (
      <Fragment>
        {start.present && finish.present ? (
          <Header run={this.runDijkstra} />
        ) : (
          <Alert variant="primary">Please Choose A Start & End Node</Alert>
        )}
        <div>
          <Info />
          <div className="Grid" children={nodes} />
        </div>
      </Fragment>
    );
  }
}

Grid.propTypes = {
  view: PropTypes.object.isRequired,
};
