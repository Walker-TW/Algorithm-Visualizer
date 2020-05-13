export function dijkstra(grid, start, finish) {
  const nodesVisited = [];
  start.distance = 0;
  // If a start node is not chosen then it will set all nodes to 0
  // so make a check to be sure that it exists!!!
  const unvisitedNodes = getNodes(grid);
  checkGridIs(unvisitedNodes);
  while (!!unvisitedNodes.length) {
    sortUnvistedDistance(unvisitedNodes);
    console.log("1");
    const closestNode = unvisitedNodes.shift();
    console.log("2");
    if (closestNode.distance === Infinity) return nodesVisited;
    closestNode.visited = true;
    console.log("3");
    nodesVisited.push(closestNode);
    console.log("4");
    if (closestNode === finish) return nodesVisited;

    console.log(closestNode, finish, "comparison");

    console.log("5");
    updateUnvisitedNeighbors(closestNode, grid);
    console.log("6");
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

function checkGridIs(unvisitedNodes) {
  for (let i = 0; i < unvisitedNodes.gridID; i++) {
    console.log(unvisitedNodes[i].visited, "GridIds");
  }
}

function sortUnvistedDistance(unvisitedNodes) {
  unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance);
  console.log("sortUnvistedDistance");
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    console.log("updateVisitedNeighbours");
    console.log(neighbor, "neighbour");
    console.log(node, "node");
    neighbor.distance = node.distance + 1;
    // iterating the distance
    neighbor.pastNode = node;
    // the new node is the neighbour of the previous node
    console.log(node);
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
  return neighbors.filter((neighbor) => !neighbor.visited);
  // return the neighbours that have not been visted(which ic listed in the state)
}

export function getNodesInShortestPathOrder(endNode) {
  console.log(endNode, "getNodesInShortestPathOrder");
  const nodesInShortestPathOrder = [];
  // current node == the final node
  let currentNode = endNode;
  while (currentNode !== null) {
    // while you still have nodes
    nodesInShortestPathOrder.unshift(currentNode);
    // push the current node into sortest path order
    currentNode = currentNode.pastNode;
    // then make the new current node the previous node in the array and makes
    // it the current node
  }
  // when finished returns an array of shortest nodes in the order of the path
  return nodesInShortestPathOrder;
}
