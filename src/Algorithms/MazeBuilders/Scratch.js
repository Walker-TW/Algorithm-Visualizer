const HORIZONAL = 1;
const VERTICAL = 2;
const [S, E] = [1, 2];

export const recursiveDivision = (grid, nodeHandler) => {
  const [width, height] = [grid.length, grid[0].length];

  // stop the maze getting too tight

  // outerFences(grid, width, height, nodeHandler);
  // grid[5].forEach((node, i) => {
  //   if (i >= 1 && i < height - 1) nodeHandler(node, 'fence');
  // });
  // nodeHandler(grid[5][3], 'passage');
  // console.log(grid[5][3]);
  divide(grid, 2, 2, width, height, getOrientation(width, height), nodeHandler);
  // nodeHandler(grid[5][4]);
  // nodeHandler(grid[3][4]);
};

const getOrientation = (width, height) => {
  // const horizontal = 1;
  // const vertical = 2;
  if (width < height) {
    console.log('vertical');
    return 'vertical';
  } else if (width > height) {
    console.log('horizontal');
    return 'horizontal';
  } else {
    return Math.random() >= 0.5 ? 'horizontal' : 'vertical';
  }
};

const outerFences = (grid, width, height, nodeHandler) => {
  let fences = [];
  grid.forEach((row, index) => {
    if (index === 0 || index === width - 1) {
      row.forEach((node) => {
        fences.push(node);
      });
    } else {
      fences.push(row[0]);
      fences.push(row[height - 1]);
    }
  });
  fences.forEach((node) => {
    nodeHandler(node, 'fence');
  });
};

const divide = function (
  grid,
  x,
  y,
  width,
  height,
  // count,
  orientation,
  nodeHandler
) {
  // const [S, E] = [1, 2];
  if (width <= 3 || height <= 3) return;

  let horizontal = orientation === 'horizontal';
  // let dir = orientation === 'horizontal' ? S : E;
  let length = orientation === 'horizontal' ? height : width;
  let newWallXStart = Math.abs(
    x + (horizontal ? 0 : Math.floor(Math.random() * width) - 2)
  );
  let newWallYStart = Math.abs(
    y + (horizontal ? Math.floor(Math.random() * height) - 2 : 0)
  );

  let passageX =
    // newWallXStart +
    1 + Math.abs(horizontal ? Math.floor(Math.random() * length - 1) : 0);
  let passageY =
    // newWallYStart +
    1 + Math.abs(horizontal ? 0 : Math.floor(Math.random() * height - 1));

  let directionY = horizontal ? 1 : 0;
  let directionX = horizontal ? 0 : 1;

  console.log('width', width);
  console.log('height', height);
  console.log(newWallXStart, 'newwallx');
  console.log(newWallYStart, 'newwally');
  console.log(passageX, 'passagex');
  console.log(passageY, 'passagey');

  let currentFences = [];
  // let counterX = count === 0 ? 0 : newWallXStart;
  // let counterY = count === 0 ? 0 : newWallYStart;
  if (horizontal) {
    grid[newWallXStart].forEach((node) => {
      currentFences.push(node);
    });
  } else {
    for (let i = newWallXStart; i < length; i++) {
      let node = grid[i][newWallXStart];
      currentFences.push(node);

      // newWallXStart += directionX;
      // newWallYStart += directionY;
    }
  }
  console.log(currentFences, 'currentfences');

  let passage =
    currentFences.length > 2
      ? currentFences.splice(horizontal ? passageY : passageX, 1)
      : currentFences.pop();

  console.log('passage', passage);

  nodeHandler(passage[0] ? passage[0] : passage, 'passage');

  currentFences.forEach((node) => {
    if (!node.passage) nodeHandler(node, 'fence');
  });

  let [newX, newY] = [x, y];
  let [newWidth, newHeight] = horizontal
    ? [newWallXStart - x + 3, height]
    : [width, newWallYStart - y + 3];
  divide(
    grid,
    newX,
    newY,
    newWidth,
    newHeight,
    getOrientation(newWidth, newHeight),
    nodeHandler
  );
  [newX, newY] = horizontal ? [x, newWallYStart + 1] : [newWallYStart + 1, x];
  //
  // w, h = horizontal ? [width, y+height-wy-1] : [x+width-wx-1, height]
  [newWidth, newHeight] = horizontal
    ? [width, y + height - newWallYStart - 1]
    : [x + width - newWallXStart - 1, height];
  divide(
    grid,
    newX,
    newY,
    newWidth,
    newHeight,
    getOrientation(newWidth, newHeight),
    nodeHandler
  );
};
