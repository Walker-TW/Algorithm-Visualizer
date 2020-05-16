export function aStar(grid, start, finish) {
  const nodesVisited = [];
  start.distance = 0;
  start.heuristic = findManhatten(start, finish);
  console.log(start, "start");
  const unvistedNodes = getNodes(grid);
  findManhattenOnAllNodes(unvistedNodes, finish, start);
}

function getNodes(grid) {
  const allNodes = [];
  for (const row of grid) {
    for (const node of row) {
      allNodes.push(node);
    }
  }
  console.log(allNodes);
  return allNodes;
}

function findManhatten(node, finish) {
  const finalNodeX = finish.gridId.rowIndex + 1;
  const finalNodeY = finish.gridId.colIndex + 1;
  const nodeX = node.gridId.rowIndex + 1;
  const nodeY = node.gridId.colIndex + 1;
  const manhatten = Math.abs(nodeX + finalNodeX) + Math.abs(nodeY + finalNodeY);
  return manhatten;
}

function findManhattenOnAllNodes(unvistedNodes, start, finish) {
  console.log(unvistedNodes, "unvistedNodes");
  for (const node of unvistedNodes) {
    node.manhatten = findManhatten(node, finish);
  }
  console.log(unvistedNodes, "After Manhatten performed");
}
