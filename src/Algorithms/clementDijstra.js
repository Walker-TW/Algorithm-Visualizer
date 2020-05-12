// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export const dijkstra = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    // keep going until no unvisted node
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.

    // BRING IT BACK

    // if (closestNode.isWall) continue;

    // BRING IT BACK

    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    // when your nearest node is not assigned return the array visitedNodeInOrder
    closestNode.isVisited = true;
    // make the closest node visited
    visitedNodesInOrder.push(closestNode);
    // push the closestNode into vistedNodeInOrder
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
    // if the closest node is the rend return the final Nodes in Order array
    // If not run updateVistedNeighbours (ie add the ClosestNode to the neighbours array)
  }
};

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
// sorts nodes in descending order

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    // iterating the distance
    neighbor.previousNode = node;
    // the new node is the neighbour of the previous node
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  // creates an object with the index of the node
  // these are all checks
  if (row > 0) neighbors.push(grid[row - 1][col]);
  // if the row is not 0 then push into neighbours the node (0 indexed)
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  // if the row is smaller than the grid length push into neighbours the node (+1)
  if (col > 0) neighbors.push(grid[row][col - 1]);
  // if column is smaller than 0 push in neighbours 0 indexed
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  // and if ????
  return neighbors.filter((neighbor) => !neighbor.isVisited);
  // return the neighbours that have not been visted(which ic listed in the state)
}

function getAllNodes(grid) {
  const nodes = [];
  // takes the grid as a argument and creates an array of nodes
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  // current node == the final node
  let currentNode = finishNode;
  while (currentNode !== null) {
    // while you still have nodes
    nodesInShortestPathOrder.unshift(currentNode);
    // push the current node into sortest path order
    currentNode = currentNode.previousNode;
    // then make the new current node the previous node in the array and makes
    // it the current node
  }
  // when finished returns an array of shortest nodes in the order of the path
  return nodesInShortestPathOrder;
}
