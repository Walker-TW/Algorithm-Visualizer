export function dijkstra(grid, start, finish) {
  const nodesVisited = [];
  start.distance = 0;
  // If a start node is not chosen then it will set all nodes to 0
  // so make a check to be sure that it exists!!!
  const unvisitedNodes = getNodes(grid);
  console.log(unvisitedNodes);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    console.log('1');
    const closestNode = unvisitedNodes.shift();
    console.log('2');
    console.log(closestNode, 'Closest Node');
    if (closestNode.distance === Infinity) return nodesVisited;
    closestNode.visited = true;

    console.log(closestNode, 'closestnode2');

    console.log('3');
    nodesVisited.push(closestNode);
    console.log('4');
    checkVisited(unvisitedNodes);
    if (closestNode === finish) return nodesVisited;

    console.log(closestNode, finish, 'comparison');

    console.log('5');
    updateUnvisitedNeighbors(closestNode, grid);
    console.log('6');
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

function checkVisited(unvistedNodes) {
  for (let i = 0; i < unvistedNodes.length; i++) {
    console.log(unvistedNodes[i].visited);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    console.log(neighbor, 'neighbour');
    console.log(node, 'node');
    neighbor.distance = node.distance + 1;
    // iterating the distance
    neighbor.pastNode = node;
    // the new node is the neighbour of the previous node
    console.log(node);
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
  return neighbors.filter((neighbor) => !neighbor.visited);
  // return the neighbours that have not been visted(which ic listed in the state)
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  // current node == the final node
  let currentNode = finishNode;
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
