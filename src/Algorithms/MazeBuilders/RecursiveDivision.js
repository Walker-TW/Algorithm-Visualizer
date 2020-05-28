const HORIZONAL = 1;
const VERTICAL = 2;
const [S, E] = [1, 2];

export const recursiveDivision = (grid, nodeHandler) => {
  const [width, height] = [grid.length, grid[0].length];

  // stop the maze getting too tight

  // fences = [...fences, ...divide(grid, width, height, orientation)];
  outerFences(grid, width, height, nodeHandler);
  divide(grid, 1, height, 1, width, getOrientation(width, height), nodeHandler);
  // nodeHandler(grid[5][4]);
  // nodeHandler(grid[3][4]);
};

export const getOrientation = (width, height) => {
  // const horizontal = 1;
  // const vertical = 2;
  if (width < height) {
    return 'vertical';
  } else if (width > height) {
    return 'horizontal';
  } else {
    return Math.random() >= 0.5 ? 'horizontal' : 'vertical';
  }
};

export const outerFences = (grid, width, height, nodeHandler) => {
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

export const divide = function (
  grid,
  colStart,
  colEnd,
  rowStart,
  rowEnd,
  orientation,
  nodeHandler
) {
  // const [S, E] = [1, 2];
  const [min, max] = [
    orientation === 'horizontal' ? colStart : rowStart,
    orientation === 'horizontal' ? colEnd : rowEnd,
  ];
  if (Math.abs(rowStart - rowEnd) < 3 || Math.abs(colStart - colEnd) < 3)
    return;
  // let dir = orientation === 'vertical' ? S : E;
  if (orientation === 'horizontal') {
    // console.log(max, 'max 1');
    let randomColIndex = Math.floor(1 + (Math.random() * max - 1));
    let currentCol = grid[randomColIndex];
    let randomPassageIndex = Math.random() * (currentCol.length - 1) + 1;
    // remove border clash
    const borderlessCurrentCol = currentCol.slice(1, -1);
    // random hole in column
    const randomPassage = borderlessCurrentCol.splice(randomPassageIndex, 1);
    // console.log(randomPassage, 'random passage');
    nodeHandler(randomPassage[0], 'passage');
    borderlessCurrentCol.forEach((node) => {
      return node.passage ? node : nodeHandler(node, 'fence');
    });
    let startToNDist = Math.abs(colStart - randomColIndex);
    let nToEndDist = Math.abs(rowEnd - randomColIndex - 1);
    // let [newWidth, newHeight] = [];
    if (startToNDist > nToEndDist) {
      divide(
        grid,
        colStart,
        colEnd,
        rowStart,
        randomColIndex - 1,
        orientation,
        nodeHandler
      );
    } else {
      divide(
        grid,
        colStart,
        colEnd,
        rowStart,
        randomColIndex - 1,
        'vertical',
        nodeHandler
      );
    }
    if (rowEnd - (randomColIndex + 2) > colEnd - colStart) {
      divide(
        grid,
        colStart,
        colEnd,
        randomColIndex + 1,
        rowEnd,
        orientation,
        nodeHandler
      );
    } else {
      divide(
        grid,
        colStart,
        colEnd,
        randomColIndex + 1,
        rowEnd,
        'vertical',
        nodeHandler
      );
    }
  } else {
    // const [min, max] = [1, orientation === 'vertical' ? colEnd : rowEnd];

    let randomRowIndex = Math.floor(min + (Math.random() * max - min));
    let currentRow = [];
    for (let i = rowStart; i < max; i++) {
      console.log(i, max, 'the i number');
      const node = grid[i][max];
      console.log(node, 'the node its doing');
      if (!node.fence && !node.passage) {
        currentRow.push(node);
      }
    }
    // console.log(currentRow, 'current row');

    let randomPassageIndex = Math.floor(
      Math.random() * (currentRow.length - 1)
    );
    // const borderlessCurrentRow = currentRow.slice(1, -1);
    const borderlessCurrentRow = currentRow;
    // console.log(borderlessCurrentRow, 'bcr');
    const randomPassage = borderlessCurrentRow.splice(randomPassageIndex, 1);
    // console.log(randomPassage, 'random');
    nodeHandler(randomPassage[0], 'passage');
    borderlessCurrentRow.forEach((node) => {
      return node.passage ? node : nodeHandler(node, 'fence');
    });

    let startToNDist = Math.abs(colStart - colEnd);
    let nToEndDist = Math.abs(colEnd - randomRowIndex - 1);
    if (startToNDist < nToEndDist) {
      divide(
        grid,
        rowStart + 2,
        colEnd,
        randomRowIndex,
        rowEnd,
        orientation,
        nodeHandler
      );
    } else {
      divide(
        grid,
        rowStart + 2,
        colEnd,
        randomRowIndex,
        rowEnd,
        'horizontal',
        nodeHandler
      );
    }
  }
  // return borderlessCurrentRow;
};
