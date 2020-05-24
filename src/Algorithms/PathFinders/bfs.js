export function breadthFirstSearch(grid, start, end) {
  const queue = [start];
  const nodesVisited = [];
  while (queue.length !== 0) {
    const currentNode = queue.shift();
    if (currentNode.fence === true) continue;
    nodesVisited.push(currentNode);
    if (currentNode === end) return nodesVisited;
    if (currentNode.visited !== true) {
      currentNode.visited = true;
      updateUnvisitedNeighbors(currentNode, grid, queue);
    }
  }
}

function updateUnvisitedNeighbors(closestNode, grid, stack) {
  const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
  for (const neighbour of unvisitedNeighbors) {
    neighbour.pastNode = closestNode;
    stack.push(neighbour);
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
  return neighbours.filter((neighbour) => !neighbour.visited);
}

// remember bfs uses queues
// so its all shift

export function findShortestPathBFS(endNode) {
  const shortestPath = [];
  let thisNode = endNode;
  while (thisNode !== null) {
    shortestPath.unshift(thisNode);
    thisNode = thisNode.pastNode;
  }
  return shortestPath;
}
