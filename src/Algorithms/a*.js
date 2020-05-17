export function aStar(grid, start, finish) {
  const nodesVisited = [];
  console.log(start, "start");
  console.log(finish, "finish");
  start.distance = 0;
  start.manhatten = findManhatten(start, finish);
  // console.log(start, "before setting it");
  findHeuristicTotal(start);
  // set the heuristic here
  // console.log(start, "after setting it");
  const unvisitedNodes = getNodes(grid);
  const unvistedAndManhattenNodes = findManhattenOnAllNodes(
    unvisitedNodes,
    finish,
    start
  );
  console.log(unvistedAndManhattenNodes.length, "unvistedmanhattened nodes");
  while (!!unvistedAndManhattenNodes.length) {
    console.log(unvistedAndManhattenNodes[0], "1");
    sortUnvisitedHeuritsic(unvistedAndManhattenNodes);
    console.log(unvistedAndManhattenNodes[0], "after sort");
    console.log("2");
    const closestNode = unvistedAndManhattenNodes.shift();
    console.log("3");
    if (closestNode.fence === true) continue;
    console.log(closestNode, "4");
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
  const manhatten = Math.abs(nodeX - finalNodeX) + Math.abs(nodeY - finalNodeY);
  return manhatten;
}

function findManhattenOnAllNodes(unvisitedNodes, start, finish) {
  for (const node of unvisitedNodes) {
    node.manhatten = findManhatten(node, finish);
  }
  return unvisitedNodes;
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

// function sortUnvisitedDistance(unvisitedNodes) {
//   unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance);
// }

function updateUnvisitedNeighbors(closestNode, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
  console.log(unvisitedNeighbors, "unvisitedNeighbors");
  for (const neighbor of unvisitedNeighbors) {
    console.log(neighbor, "before distance update");
    neighbor.distance = closestNode.distance + 1;
    console.log(neighbor, "after distance update");
    // update distance
    console.log(neighbor, "before heuritsic total");
    findHeuristicTotal(neighbor);
    // give it a heuristic total here.
    console.log(neighbor, "after heuritsic total");
    // here it is finding and changing the heuristic total
    neighbor.pastNode = closestNode;
    console.log(closestNode, "the closestNode");
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
  const x = neighbors.filter((neighbor) => !neighbor.visited);
  return x.filter((neighbor) => !neighbor.start);
}

function sortUnvisitedHeuritsic(neighbors) {
  const x = neighbors.sort(function (node1, node2) {
    return node1.heuristic - node2.heuristic;
  });
  // this sort is working
  return x;
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
