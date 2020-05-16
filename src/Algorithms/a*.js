export function aStar(grid, start, finish) {
  const nodesVisited = [];
  start.distance = 0;
  findManhatten(getNodes(grid));
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

function findManhatten(allNodes) {
  console.log(allNodes);
}
