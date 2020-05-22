import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

import Nodes from './Nodes/Nodes';
import Header from './Header/Header';

import { dijkstra, findShortestPath } from '../Algorithms/dijkstra';
import {
  aStarManhatten,
  findShortestPathAStarM,
} from '../Algorithms/a*manhatten';
import {
  aStarEuclidean,
  findShortestPathAStarE,
} from '../Algorithms/a*euclidean';

import './Visualizer.css';

export default class Visualizer extends Component {
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
    window.addEventListener('resize', this.gridSetup);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.gridSetup);
  }

  createNode = (gridId) => {
    return {
      gridId,
      heuristic: Infinity,
      manhatten: Infinity,
      distance: Infinity,
      visited: false,
      pastNode: null,
      start: false,
      finish: false,
      fence: false,
    };
  };

  gridSetup = () => {
    const [screenWidth, screenHeight] = [window.innerWidth, window.innerHeight];

    let width, height;
    if (screenWidth > 1450) {
      width = screenWidth / 20 - 12;
      height = screenHeight / 20 - 7;
    } else if (screenWidth > 900) {
      width = screenWidth / 30;
      height = screenHeight / 30;
    } else {
      width = screenWidth / 40 - 3;
      height = screenHeight / 40 - 5;
    }

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
    let grid = [...this.state.grid];

    grid.forEach((row) => {
      row.forEach((node) => {
        this.resetNodeHandler(node);
      });
    });

    this.setState({ grid: grid });
  };

  resetNodeHandler = (node) => {
    const resetNodeStyle = (node) => {
      document.getElementById(
        `node-${node.gridId.colIndex}-${node.gridId.rowIndex}`
      ).className = `Node`;
    };

    const resetNode = (node) => {
      node.heuristic = Infinity;
      node.manhatten = Infinity;
      node.distance = Infinity;
      node.visited = false;
      node.pastNode = null;
    };

    if (node.start || node.fence || node.finish) {
      resetNode(node);
    } else {
      resetNodeStyle(node);
      node = this.createNode(node.gridId);
    }
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
    for (let i = 1; i <= visitedNodesInOrder.length - 1; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 5 * i);
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
      }, 5 * i);
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

    return (
      <div className="Visualizer">
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

        <Nodes
          grid={grid}
          gridHasStart={start.present}
          gridHasFinish={finish.present}
          fenceToggle={fenceToggle}
          nodeFlag={this.nodeFlag}
          mouseFlag={this.mouseFlag}
          updateNode={this.updateNode}
          mouseToggle={mouseToggle}
        />
      </div>
    );
  }
}
