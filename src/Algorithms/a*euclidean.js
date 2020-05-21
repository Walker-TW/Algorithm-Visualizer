export function aStarEuclidean(grid, start, finish) {
  let open = [start];
  const closed = [];
  start.distance = 0;
  start.manhatten = findManhatten(start, finish);
  setHeuristicTotal(start);
  while (open.length) {
    open = sortUnvisitedHeuritsic(open);

    const currentNode = open.shift();

    currentNode.visited = true;
    closed.push(currentNode);
    if (currentNode === finish) {
      return closed;
    }

    addNeighboursToOpen(currentNode, grid, open, finish);
  }
}

function addNeighboursToOpen(currentNode, grid, open, finish) {
  const unVisitedNotFenceNeighbours = getUnvisitedNeighbors(currentNode, grid);
  for (const neighbour of unVisitedNotFenceNeighbours) {
    neighbour.distance = currentNode.distance + 1;
    neighbour.manhatten = findManhatten(neighbour, finish);
    heuristicCheck(neighbour);
    neighbour.pastNode = currentNode;
    if (!open[neighbour]) {
      open.push(neighbour);
    }
  }
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
  if (rowIndex > 0) neighbours.push(grid[rowIndex - 1][colIndex]);
  if (rowIndex < grid.length - 1) neighbours.push(grid[rowIndex + 1][colIndex]);
  if (colIndex > 0) neighbours.push(grid[rowIndex][colIndex - 1]);
  if (colIndex < grid[0].length - 1)
    neighbours.push(grid[rowIndex][colIndex + 1]);
  return neighbours.filter(
    (neighbour) => !neighbour.visited && !neighbour.fence
  );
}

function findManhatten(node, finish) {
  const { rowIndex: finalNodeX, colIndex: finalNodeY } = finish.gridId;

  const { rowIndex: nodeX, colIndex: nodeY } = node.gridId;

  const manhatten = (nodeX - finalNodeX) ** 2 + (nodeY - finalNodeY) ** 2;
  return manhatten;
}

function setHeuristicTotal(node) {
  node.heuristic = node.distance + node.manhatten;
}

function sortUnvisitedHeuritsic(nodes) {
  const heuristicAsc = nodes.sort((node1, node2) => {
    return node1.heuristic - node2.heuristic;
  });
  const unvHeuristicAsc = heuristicAsc.filter((nodes) => !nodes.visited);
  return unvHeuristicAsc;
}

export function findShortestPathAStarE(finish) {
  const shortestPath = [];
  let thisNode = finish;
  while (thisNode) {
    shortestPath.unshift(thisNode);
    thisNode = thisNode.pastNode;
  }
  return shortestPath;
}
