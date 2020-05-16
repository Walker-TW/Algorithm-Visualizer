export function aStar(grid, start, finish) {
  const nodesVisited = [];
  start.distance = 0;
  start.manhatten = findManhatten(start, finish);
  const unvisitedNodes = getNodes(grid);
  const unvistedAndManhattenNodes = findManhattenOnAllNodes(
    unvisitedNodes,
    finish,
    start
  );
  console.log(unvistedAndManhattenNodes, "what you looking for");
  while (!!unvisitedNodes.length) {
    console.log("1");
    sortUnvisitedDistance(unvisitedNodes);
    console.log("2");
    const closestNode = unvisitedNodes.shift();
    console.log("3");
    if (closestNode.fence === true) continue;
    console.log(closestNode, "the closestnode");
    console.log("4");
    if (closestNode.distance === Infinity) return nodesVisited;
    console.log("5");
    closestNode.visited = true;
    console.log("6");
    nodesVisited.push(closestNode);
    console.log("7");
    if (closestNode === finish) return nodesVisited;
    console.log("8");
    updateUnvisitedNeighbors(closestNode, grid);
    console.log("9");
  }
}

function getNodes(grid) {
  const allNodes = [];
  for (const row of grid) {
    for (const node of row) {
      allNodes.push(node);
    }
  }
  return allNodes;
}

function findManhatten(node, finish) {
  const finalNodeX = finish.gridId.rowIndex + 1;
  const finalNodeY = finish.gridId.colIndex + 1;
  const nodeX = node.gridId.rowIndex + 1;
  const nodeY = node.gridId.colIndex + 1;
  const manhatten = Math.abs(nodeX + finalNodeX) + Math.abs(nodeY + finalNodeY);
  return manhatten;
}

function findManhattenOnAllNodes(unvisitedNodes, start, finish) {
  for (const node of unvisitedNodes) {
    node.manhatten = findManhatten(node, finish);
  }
}

function findHeuristicTotal(node) {
  node.heuristic = node.distance + node.manhatten;
}

// function updateHeuristicTotalForAll(unvisitedNodes) {
//   for (const node of unvisitedNodes) {
//     findHeuristicTotal(node);
//     console.log(unvisitedNodes, "what your looking for");
//   }
// }

function sortUnvisitedDistance(unvisitedNodes) {
  unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance);
}

function sortUnvisitedHeuritsic(neighbors) {
  neighbors.sort(function (node1, node2) {
    return node1.heuristic - node2.heuristic;
  });
}

function updateUnvisitedNeighbors(closestNode, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = closestNode.distance + 1;
    findHeuristicTotal(neighbor);
    neighbor.pastNode = closestNode;
    // the new node is the neighbour of the previous node
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { colIndex, rowIndex } = node.gridId;
  // creates an object with the index of the node
  // these are all checks
  if (rowIndex > 0) neighbors.push(grid[rowIndex - 1][colIndex]);
  // if the row is not 0 then push into neighbours the node (0 indexed)
  if (rowIndex < grid.length - 1) neighbors.push(grid[rowIndex + 1][colIndex]);
  // if the row is smaller than the grid length push into neighbours the node (+1)
  if (colIndex > 0) neighbors.push(grid[rowIndex][colIndex - 1]);
  // if column is smaller than 0 push in neighbours 0 indexed
  if (colIndex < grid[0].length - 1)
    neighbors.push(grid[rowIndex][colIndex + 1]);
  // and if ????
  sortUnvisitedHeuritsic(neighbors);
  return neighbors.filter((neighbor) => !neighbor.visited);
  // return the neighbours that have not been visted(which ic listed in the state)
}

export function findShortestPathAStar(endNode) {
  const shortestPath = [];
  // current node == the final node
  let thisNode = endNode;
  while (thisNode !== null) {
    // while you still have nodes
    shortestPath.unshift(thisNode);
    // push the current node into sortest path order
    thisNode = thisNode.pastNode;
    // then make the new current node the previous node in the array and makes
    // it the current node
  }
  // when finished returns an array of shortest nodes in the order of the path
  return shortestPath;
}
