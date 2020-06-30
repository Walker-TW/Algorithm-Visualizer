import React, { Component, Fragment } from 'react';

import { getDimensions, defaultNodeSize } from '../Helpers/getDimensions';

import Alert from 'react-bootstrap/Alert';
import { Header, Grid, Stats } from './Components';
import {
  dijkstra,
  findShortestPath,
  aStarManhatten,
  findShortestPathAStarM,
  aStarEuclidean,
  findShortestPathAStarE,
  breadthFirstSearch,
  findShortestPathBFS,
  depthFirstSearch,
  findShortestPathDFS,
} from '../Algorithms';
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
    nodeSize: 0,
    nodesProccessed: 'None Yet',
    fastestPath: 'None Yet',
    algorithmRan: 'None Yet',
    speed: '4',
    speedHash: {
      '1': 25,
      '2': 18,
      '3': 13,
      '4': 7,
      '5': 2,
    },
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

  gridSetup = (dimensions = getDimensions(defaultNodeSize)) => {
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
        this.resetNodeHandler(node, 'all');
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

  statsUpdate = (algorithm, nodesProccessed, fastestPath, runtime) => {
    this.setState({
      algorithmRan: algorithm,
      nodesProccessed: nodesProccessed,
      fastestPath: fastestPath,
      runtime: runtime,
    });
  };

  animationSpeed = (speedGiven) => {
    this.setState({ speed: speedGiven });
  };
  setNodeSize = (size) => {
    this.setState({ nodeSize: size });
  };

  // reset

  resetVisited = () => {
    let grid = [...this.state.grid];
    grid.forEach((row) => {
      row.forEach((node) => {
        this.resetNodeHandler(node, 'visited');
      });
    });

    this.setState({ grid: grid });
  };

  resetFences = () => {
    let grid = [...this.state.grid];
    grid.forEach((row) => {
      row.forEach((node) => {
        if (node.fence) this.resetNodeHandler(node, 'fence');
      });
    });
  };

  resetStartFinish = (type) => {
    const { rowIndex, colIndex } = this.state[type].gridId;
    let node = this.state.grid[rowIndex][colIndex];

    this.resetNodeHandler(node, [type]);
    this.setState({ [type]: { present: false } });
  };

  resetNodeHandler = (node, type) => {
    const resetNodeStyle = (node) => {
      document.getElementById(
        `node-${node.gridId.colIndex}-${node.gridId.rowIndex}`
      ).className = `Node`;
    };

    const resetNodeObject = (node, type) => {
      node.heuristic = Infinity;
      node.manhatten = Infinity;
      node.distance = Infinity;
      node.visited = false;
      node.pastNode = null;
      if (type === 'all') {
        node = this.createNode(node.gridId);
      }
      if (type === 'fence' || 'start' || 'finish') {
        node[type] = false;
      }
    };

    if (type === 'visited') {
      if (node.start || node.fence || node.finish) {
        resetNodeObject(node, [type]);
      } else {
        resetNodeObject(node, 'all');
        resetNodeStyle(node);
      }
    } else if ((type === 'all', 'fence' || 'start' || 'finish')) {
      resetNodeObject(node, [type]);
      resetNodeStyle(node);
    }
  };

  // algorithms

  run = () => {
    const { algorithm } = this.state;
    this.resetVisited();
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

  // animation
  animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    const { speed, speedHash } = this.state;
    const animationTimer = speedHash[speed];

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
      fenceToggle,
      finish,
      grid,
      mouseToggle,
      start,
      runtime,
      nodesProccessed,
      nodeSize,
      fastestPath,
      algorithmRan,
      speed,
    } = this.state;

    const nodeProps = {
      gridHasStart: start.present,
      gridHasFinish: finish.present,
      fenceToggle,
      nodeFlag: this.nodeFlag,
      mouseFlag: this.mouseFlag,
      updateNode: this.updateNode,
      mouseToggle: mouseToggle,
      resetStartFinish: this.resetStartFinish,
      size: nodeSize,
    };

    return (
      <Fragment>
        <Header
          algorithm={algorithm}
          animationSpeed={this.animationSpeed}
          device={window.innerWidth <= 900 ? 'mobile' : 'desktop'}
          resizeGrid={this.resizeGrid}
          ready={start.present && finish.present}
          run={this.run}
          setAlgorithm={this.setAlgorithm}
          fenceToggle={this.fenceToggler}
          resetFences={this.resetFences}
          resetVisited={this.resetVisited}
          setNodeSize={this.setNodeSize}
          speed={speed}
        />

        {!start.present && !finish.present ? (
          <Alert variant="primary">Please Choose A Start & End Node</Alert>
        ) : !start.present ? (
          <Alert variant="primary">Please Choose A Start Node</Alert>
        ) : !finish.present ? (
          <Alert variant="primary">Please Choose An End Node</Alert>
        ) : null}
        <Stats
          runtime={runtime}
          nodesProccessed={nodesProccessed}
          fastestPath={fastestPath}
          algorithmRan={algorithmRan}
        />
        <Grid grid={grid} nodeProps={nodeProps} />
      </Fragment>
    );
  }
}
