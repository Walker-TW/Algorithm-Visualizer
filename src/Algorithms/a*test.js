export function aStar(grid, start, finish) {
  console.log(start, 'start');
  console.log(finish, 'finish');
  let open = [start];
  const closed = [];
  start.distance = 0;
  start.manhatten = findManhatten(start, finish);
  setHeuristicTotal(start);
  // start has been set here
  while (open.length) {
    open = sortUnvisitedHeuritsic(open);
    console.log(open.length, 'this should never be above 100');
    const currentNode = open.shift();
    currentNode.visited = true;
    closed.push(currentNode);
    console.log(currentNode, 'the Closest Node');
    console.log(currentNode === finish, 'is this the end node');
    if (currentNode === finish) {
      console.log(closed, 'FINAL ARRAY');
      return closed;
    }

    addNeighboursToOpen(currentNode, grid, open, finish);
    // find-out if the neighbours are visted or a wall
  }
}

function addNeighboursToOpen(currentNode, grid, open, finish) {
  const unVisitedNotFenceNeighbours = getUnvisitedNeighbors(currentNode, grid);
  console.log(unVisitedNotFenceNeighbours, 'is this an array?');
  console.log(unVisitedNotFenceNeighbours[0], 'is visited?');
  console.log(unVisitedNotFenceNeighbours[1], 'is visited?');
  console.log(unVisitedNotFenceNeighbours[2], 'is visited?');
  console.log(unVisitedNotFenceNeighbours[3], 'is visited?');

  for (const neighbour of unVisitedNotFenceNeighbours) {
    neighbour.distance = currentNode.distance + 1;
    neighbour.manhatten = findManhatten(neighbour, finish);
    heuristicCheck(neighbour);
    neighbour.pastNode = currentNode;
    if (!open[neighbour]) {
      open.push(neighbour);
    }
  }
  // is broken because instead of searching in closed it is not updatign neighbours?
}

function heuristicCheck(node) {
  const heuristicTotal = node.distance + node.manhatten;
  if (node.heuristic > heuristicTotal) {
    node.heuristic = heuristicTotal;
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
  return neighbours.filter(
    (neighbour) => !neighbour.visited && !neighbour.fence
  );

  // check if fence after open?
  // return the neighbours that have not been visted(which ic listed in the state)
}

function findManhatten(node, finish) {
  const { rowIndex: finalNodeX, colIndex: finalNodeY } = finish.gridId;

  const { rowIndex: nodeX, colIndex: nodeY } = node.gridId;

  const manhatten = Math.abs(nodeX - finalNodeX) + Math.abs(nodeY - finalNodeY);
  return manhatten;
}

function setHeuristicTotal(node) {
  node.heuristic = node.distance + node.manhatten;
}

function sortUnvisitedHeuritsic(nodes) {
  const heuristicAsc = nodes.sort((node1, node2) => {
    return node1.heuristic - node2.heuristic;
  });
  // this sort is working
  const unvHeuristicAsc = heuristicAsc.filter((nodes) => !nodes.visited);
  return unvHeuristicAsc;
}

export function findShortestPathAStar(finish) {
  const shortestPath = [];
  // current node == the final node
  let thisNode = finish;
  while (thisNode) {
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
