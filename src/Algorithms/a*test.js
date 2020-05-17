export function aStar(grid, start, finish) {
  console.log(start, "start");
  console.log(finish, "finish");
  const open = [start];
  const closed = [];
  const allNodes = getNodes(grid);
  start.distance = 0;
  start.manhatten = findManhatten(start, finish);
  setHeuristicTotal(start);
  // start has been set here
  while (!!open.length) {
    sortUnvisitedHeuritsic(open);
    const currentNode = open.shift();
    currentNode.visited = true;
    closed.unshift(currentNode);
    console.log(currentNode, "the Closest Node");
    console.log(currentNode === finish, "is this the end node");
    if (currentNode === finish) return closed;
    addNeighboursToOpen(currentNode, grid, open, finish);
    // find-out if the neighbours are visted or a wall
    allNodes.pop();
  }
}

function addNeighboursToOpen(currentNode, grid, open, finish) {
  const unVisitedNotFenceNeighbours = getUnvisitedNeighbors(currentNode, grid);
  console.log(unVisitedNotFenceNeighbours, "is this an array?");
  for (const neighbour of unVisitedNotFenceNeighbours) {
    neighbour.distance = currentNode.distance + 1;
    neighbour.manhatten = findManhatten(neighbour, finish);
    heuristicCheck(neighbour);
    neighbour.pastNode = currentNode;
    if (neighbour.visited !== true) open.push(neighbour);
  }
}

function heuristicCheck(node) {
  if (node.heuristic > findHeuristicTotal(node)) {
    setHeuristicTotal(node);
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbours = [];
  const { colIndex, rowIndex } = node.gridId;
  // creates an object with the index of the node
  // these are all checks
  if (rowIndex > 0) neighbours.push(grid[rowIndex - 1][colIndex]);
  // if the row is not 0 then push into neighbours the node (0 indexed)
  if (rowIndex < grid.length - 1) neighbours.push(grid[rowIndex + 1][colIndex]);
  // if the row is smaller than the grid length push into neighbours the node (+1)
  if (colIndex > 0) neighbours.push(grid[rowIndex][colIndex - 1]);
  // if column is smaller than 0 push in neighbours 0 indexed
  if (colIndex < grid[0].length - 1)
    neighbours.push(grid[rowIndex][colIndex + 1]);
  // and if ????
  const x = neighbours.filter((neighbour) => !neighbour.visited);
  return x.filter((neighbour) => !neighbour.fence);
  // return the neighbours that have not been visted(which ic listed in the state)
}

// zzzzzzzzzzzzz

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
  const manhatten = Math.abs(nodeX - finalNodeX) + Math.abs(nodeY - finalNodeY);
  return manhatten;
}

function setHeuristicTotal(node) {
  node.heuristic = node.distance + node.manhatten;
}

function findHeuristicTotal(node) {
  return node.distance + node.manhatten;
}

function sortUnvisitedHeuritsic(nodes) {
  const x = nodes.sort(function (node1, node2) {
    return node1.heuristic - node2.heuristic;
  });
  // this sort is working
  const fullyFiltered = x.filter((nodes) => !nodes.visited);
  console.log(fullyFiltered, "this should have no visted in");
  return fullyFiltered;
}

export function findShortestPathAStar(finish) {
  const shortestPath = [];
  // current node == the final node
  let thisNode = finish;
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
