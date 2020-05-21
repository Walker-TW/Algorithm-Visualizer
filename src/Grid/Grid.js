import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Node from './Node/Node';
import Header from './Header/Header';
import { Alert } from 'react-bootstrap';
import Info from './Info/Info';
import { dijkstra, findShortestPath } from '../Algorithms/dijkstra';
import {
  aStarManhatten,
  findShortestPathAStarM,
} from '../Algorithms/a*manhatten';
import {
  aStarEuclidean,
  findShortestPathAStarE,
} from '../Algorithms/a*euclidean';

import './Grid.css';

export default class Grid extends Component {
  state = {
    algorithm: '',
    grid: [],
    fenceToggle: false,
    mouseToggle: false,
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
      fence: {
        present: [false],
        gridId: {
          rowIndex: null,
          colIndex: null,
        },
      },
    },
  };

  // setup methods
  componentDidMount() {
    this.gridSetup();
  }

  createNode = (gridId) => {
    return {
      gridId,
      heuristic: Infinity,
      manhatten: Infinity,
      distance: Infinity,
      visited: false,
      inOpen: false,
      pastNode: null,
      start: false,
      finish: false,
      fence: false,
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

  // state changers & prop methods
  fenceToggler = () => {
    const { fenceToggle } = this.state;

    this.setState({ fenceToggle: !fenceToggle });
  };

  mouseFlag = () => {
    const { mouseToggle } = this.state;

    this.setState({ mouseToggle: !mouseToggle });
  };

  nodeFlag = (gridId, type) => {
    const { grid } = this.state;
    const { rowIndex, colIndex } = gridId;
    const node = grid[rowIndex][colIndex];
    if (type === 'fence') {
      node[type] = !node[type];
    } else {
      node[type] = true;
      this.setState({
        [type]: {
          present: true,
          gridId: gridId,
        },
      });
    }
  };

  setAlgorithm = (selection) => {
    if (this.state.algorithm !== selection)
      this.setState({ algorithm: selection });
  };

  reset = () => {
    window.location.reload();
  };

  run = () => {
    const { algorithm } = this.state;

    if (algorithm === 'dijkstra') {
      this.runDijkstra();
    } else if (algorithm === 'A* Euclidean') {
      this.runAstarEuclidean();
    } else if (algorithm === 'A* Manhatten') {
      this.runAstarManhatten();
    }
  };

  runAstarEuclidean = () => {
    const { grid, start, finish } = this.state;
    const startNode = grid[start.gridId.rowIndex][start.gridId.colIndex];
    const finishNode = grid[finish.gridId.rowIndex][finish.gridId.colIndex];
    const resultOfAStarE = aStarEuclidean(grid, startNode, finishNode);
    const y = findShortestPathAStarE(resultOfAStarE[resultOfAStarE.length - 1]);
    this.animateAlgorithm(resultOfAStarE, y);
  };

  runAstarManhatten = () => {
    const { grid, start, finish } = this.state;
    const startNode = grid[start.gridId.rowIndex][start.gridId.colIndex];
    const finishNode = grid[finish.gridId.rowIndex][finish.gridId.colIndex];
    const resultOfAStarM = aStarManhatten(grid, startNode, finishNode);
    const y = findShortestPathAStarM(resultOfAStarM[resultOfAStarM.length - 1]);
    this.animateAlgorithm(resultOfAStarM, y);
  };

  runDijkstra = () => {
    const { grid, start, finish } = this.state;
    const startNode = grid[start.gridId.rowIndex][start.gridId.colIndex];
    const finishNode = grid[finish.gridId.rowIndex][finish.gridId.colIndex];
    const resultOfDijkstra = dijkstra(grid, startNode, finishNode);
    const y = findShortestPath(resultOfDijkstra[resultOfDijkstra.length - 1]);
    this.animateAlgorithm(resultOfDijkstra, y);
  };

  // animation
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
    const {
      algorithm,
      fenceToggle,
      finish,
      grid,
      mouseToggle,
      start,
    } = this.state;

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
              gridHasFenceToggle={fenceToggle}
              nodeFlag={this.nodeFlag}
              mouseFlag={this.mouseFlag}
              updateNode={this.updateNode}
              mouseToggle={mouseToggle}
            />
          ))}
        </div>
      );
    });

    return (
      <Fragment>
        <Header
          algorithm={algorithm}
          ready={start.present && finish.present}
          run={this.run}
          setAlgorithm={this.setAlgorithm}
          fenceToggle={this.fenceToggler}
          reset={this.reset}
        />
        {!start.present && !finish.present ? (
          <Alert variant="primary">Please Choose A Start & End Node</Alert>
        ) : !finish.present ? (
          <Alert variant="primary">Please Choose An End Node</Alert>
        ) : null}

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
