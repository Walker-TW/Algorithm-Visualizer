export function dijkstra(grid, start, finish) {
  const nodesVisited = [];
  start.distance = 0;
  // If a start node is not chosen then it will set all nodes to 0
  // so make a check to be sure that it exists!!!
  const unvisitedNodes = getNodes(grid);
  while (!!unvisitedNodes.length) {
    sortUnvisitedDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.fence === true) continue;
    if (closestNode.distance === Infinity) return nodesVisited;
    closestNode.visited = true;
    nodesVisited.push(closestNode);
    if (closestNode === finish) return nodesVisited;
    updateUnvisitedNeighbors(closestNode, grid);
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

function sortUnvisitedDistance(unvisitedNodes) {
  unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance);
}

function updateUnvisitedNeighbors(closestNode, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
  for (const neighbour of unvisitedNeighbors) {
    neighbour.distance = closestNode.distance + 1;
    // iterating the distance
    neighbour.pastNode = closestNode;
    // the new node is the neighbour of the previous node
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
  return neighbours.filter((neighbour) => !neighbour.visited);
  // return the neighbours that have not been visted(which ic listed in the state)
}

export function findShortestPath(endNode) {
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
