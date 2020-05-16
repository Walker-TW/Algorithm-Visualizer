export function aStar(grid, start, finish) {
  const nodesVisited = [];
  start.distance = 0;
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
  return allNodes;
}

function findManhatten(node, finish) {
  const finalNodeX = finish.gridId.rowIndex + 1;
  const finalNodeY = finish.gridId.colIndex + 1;
  const nodeX = node.gridId.rowIndex + 1;
  const nodeY = node.gridId.colIndex + 1;
  const manhatten = Math.abs(nodeX + finalNodeX) + Math.abs(nodeY + finalNodeY);
  console.log(manhatten, "manhatten totals");
}

function findManhattenOnAllNodes(unvistedNodes, start, finish) {
  findManhatten(start, finish);
}
