export function dijkstra(grid, start, finish) {
  // const nodesVisted = [];
  start.distance = 0;
  // If a start node is not chosen then it will set all nodes to 0
  // so make a check to be sure that it exists!!!
  console.log(grid[0][1].distance);
  const unvistedNodes = getNodes(grid);
  checkDistances(unvistedNodes);

  function getNodes(grid) {
    const allNodes = [];
    for (const row of grid) {
      for (const node of row) {
        allNodes.push(node);
      }
    }
    return allNodes;
  }

  function checkDistances(unvistedNodes) {
    for (var i = 0; i < unvistedNodes.length; i++) {
      console.log(unvistedNodes[i].distance);
    }
  }
}
