import React, { Component, Fragment } from 'react';

import getDimensions from '../Helpers/getDimensions';
import Header from './Header/Header';
import Alert from 'react-bootstrap/Alert';
import Nodes from './Nodes/Nodes';
import Stats from './Stats/Stats';
import { dijkstra, findShortestPath } from '../Algorithms/dijkstra';
import {
  aStarManhatten,
  findShortestPathAStarM,
} from '../Algorithms/a*manhatten';
import {
  aStarEuclidean,
  findShortestPathAStarE,
} from '../Algorithms/a*euclidean';
import { breadthFirstSearch, findShortestPathBFS } from '../Algorithms/bfs.js';
import { depthFirstSearch, findShortestPathDFS } from '../Algorithms/dfs.js';
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
    runtime: 'None Yet',
    nodesProccessed: 'None Yet',
    fastestPath: 'None Yet',
    algorithmRan: 'None Yet',
    speed: null,
  };

  // setup methods
  componentDidMount() {
    this.gridSetup();
  }

  createNode = (gridId) => {
    return {
      gridId,
      start: false,
      finish: false,
      visited: false,
      pastNode: null,
      fence: false,
      heuristic: Infinity,
      manhatten: Infinity,
      distance: Infinity,
    };
  };

  gridSetup = (dimensions = getDimensions()) => {
    let [width, height] = dimensions;
    this.setState({ dimensions: dimensions });
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

  resizeGrid = (dimensions) => {
    this.setState({ start: { present: false }, finish: { present: false } });

    this.gridSetup(dimensions);

    this.state.grid.forEach((row) => {
      row.forEach((node) => {
        this.resetNodeStyle(node);
        this.resetNodeObject(node, 'all');
      });
    });
  };

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

  resetNodeStyle = (node) => {
    document.getElementById(
      `node-${node.gridId.colIndex}-${node.gridId.rowIndex}`
    ).className = `Node`;
  };

  resetNodeObject = (node, type) => {
    node.heuristic = Infinity;
    node.manhatten = Infinity;
    node.distance = Infinity;
    node.visited = false;
    node.pastNode = null;
    if (type === 'all') {
      node.start = false;
      node.finish = false;
      node.fence = false;
    }
  };

  resetNodeHandler = (node) => {
    if (node.start || node.fence || node.finish) {
      this.resetNodeObject(node, 'visited');
    } else {
      this.resetNodeObject(node, 'visited');
      this.resetNodeStyle(node);
      node = this.createNode(node.gridId);
    }
  };

  run = () => {
    const { algorithm } = this.state;

    if (algorithm === 'Dijkstra') {
      this.runDijkstra();
    } else if (algorithm === 'A* Euclidean') {
      this.runAstarEuclidean();
    } else if (algorithm === 'A* Manhatten') {
      this.runAstarManhatten();
    } else if (algorithm === 'Depth First Search') {
      this.runDepthFirstSearch();
    } else if (algorithm === 'Breadth First Search') {
      this.runBreadthFirstSearch();
    }
  };

  runBreadthFirstSearch = () => {
    const { grid, start, finish } = this.state;
    const timerBegin = performance.now();

    const startNode = grid[start.gridId.rowIndex][start.gridId.colIndex];
    const finishNode = grid[finish.gridId.rowIndex][finish.gridId.colIndex];
    const resultOfBreadthFirstSearch = breadthFirstSearch(
      grid,
      startNode,
      finishNode
    );
    const z = findShortestPathBFS(
      resultOfBreadthFirstSearch[resultOfBreadthFirstSearch.length - 1]
    );
    const timerComplete = performance.now();

    this.animateAlgorithm(resultOfBreadthFirstSearch, z);
    this.statsUpdate(
      'Breadth First',
      resultOfBreadthFirstSearch.length,
      z.length,
      (timerComplete - timerBegin) * 1000
    );
  };

  runDepthFirstSearch = () => {
    const { grid, start, finish } = this.state;
    const timerBegin = performance.now();

    const startNode = grid[start.gridId.rowIndex][start.gridId.colIndex];
    const finishNode = grid[finish.gridId.rowIndex][finish.gridId.colIndex];
    const resultOfDepthFirstSearch = depthFirstSearch(
      grid,
      startNode,
      finishNode
    );
    const z = findShortestPathDFS(
      resultOfDepthFirstSearch[resultOfDepthFirstSearch.length - 1]
    );
    const timerComplete = performance.now();
    this.animateAlgorithm(resultOfDepthFirstSearch, z);
    this.statsUpdate(
      'Depth First',
      resultOfDepthFirstSearch.length,
      z.length,
      (timerComplete - timerBegin) * 1000
    );
  };

  runAstarEuclidean = () => {
    const { grid, start, finish } = this.state;
    const timerBegin = performance.now();

    const startNode = grid[start.gridId.rowIndex][start.gridId.colIndex];
    const finishNode = grid[finish.gridId.rowIndex][finish.gridId.colIndex];
    const resultOfAStarE = aStarEuclidean(grid, startNode, finishNode);
    const y = findShortestPathAStarE(resultOfAStarE[resultOfAStarE.length - 1]);
    const timerComplete = performance.now();

    this.animateAlgorithm(resultOfAStarE, y);
    this.statsUpdate(
      'A* Euclidean',
      resultOfAStarE.length,
      y.length,
      (timerComplete - timerBegin) * 1000
    );
  };

  runAstarManhatten = () => {
    const { grid, start, finish } = this.state;
    const timerBegin = performance.now();
    const startNode = grid[start.gridId.rowIndex][start.gridId.colIndex];
    const finishNode = grid[finish.gridId.rowIndex][finish.gridId.colIndex];
    const resultOfAStarM = aStarManhatten(grid, startNode, finishNode);
    const y = findShortestPathAStarM(resultOfAStarM[resultOfAStarM.length - 1]);
    const timerComplete = performance.now();
    this.animateAlgorithm(resultOfAStarM, y);
    this.statsUpdate(
      'A* Manhattan',
      resultOfAStarM.length,
      y.length,
      (timerComplete - timerBegin) * 1000
    );
  };

  runDijkstra = () => {
    const { grid, start, finish } = this.state;
    const timerBegin = performance.now();
    const startNode = grid[start.gridId.rowIndex][start.gridId.colIndex];
    const finishNode = grid[finish.gridId.rowIndex][finish.gridId.colIndex];
    const resultOfDijkstra = dijkstra(grid, startNode, finishNode);
    const y = findShortestPath(resultOfDijkstra[resultOfDijkstra.length - 1]);
    const timerComplete = performance.now();

    this.animateAlgorithm(resultOfDijkstra, y);
    this.statsUpdate(
      'Dijkstra',
      resultOfDijkstra.length,
      y.length,
      (timerComplete - timerBegin) * 1000
    );
  };

  statsUpdate = (algorithm, nodesProccessed, fastestPath, runtime) => {
    this.setState({
      algorithmRan: algorithm,
      nodesProccessed: nodesProccessed,
      fastestPath: fastestPath,
      runtime: runtime,
    });
  };

  animationSpeed = (speedGiven) => {
    const hash = { '1': 25, '2': 18, '3': 13, '4': 7, '5': 3 };
    const speedOfAlgorithm = hash[speedGiven] || 5;
    console.log(speedOfAlgorithm);
    this.setState({ speed: speedOfAlgorithm });
    console.log(this.state.speed, 'the speed it has been set to');
  };

  // animation
  animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    const animationTimer = this.state.speed;
    for (let i = 1; i <= visitedNodesInOrder.length - 1; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, animationTimer * i);
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
      }, animationTimer * i);
    }
  };

  animateShortestPath = (nodesInShortestPathOrder) => {
    const animationTimer = this.state.speed;
    console.log(animationTimer, 'animate shortest path');
    for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(
          `node-${node.gridId.colIndex}-${node.gridId.rowIndex}`
        ).className = 'Node path';
      }, animationTimer * 10 * i);
    }
  };

  render() {
    const {
      algorithm,
      dimensions,
      fenceToggle,
      finish,
      grid,
      mouseToggle,
      start,
      runtime,
      nodesProccessed,
      fastestPath,
      algorithmRan,
    } = this.state;

    return (
      <Fragment>
        <Header
          algorithm={algorithm}
          animationSpeed={this.animationSpeed}
          dimensions={dimensions}
          resizeGrid={this.resizeGrid}
          gridSetup={this.gridSetup}
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
        <Stats
          runtime={runtime}
          nodesProccessed={nodesProccessed}
          fastestPath={fastestPath}
          algorithmRan={algorithmRan}
        />
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
      </Fragment>
    );
  }
}
