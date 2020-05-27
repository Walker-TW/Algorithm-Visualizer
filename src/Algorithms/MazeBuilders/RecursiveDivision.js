const HORIZONAL = 1;
const VERTICAL = 2;
const [S, E] = [1, 2];

export const recursiveDivision = (grid, makeFence) => {
  const [width, height] = [grid.length, grid[0].length];

  // stop the maze getting too tight

  // fences = [...fences, ...divide(grid, width, height, orientation)];
  outerFences(grid, width, height, makeFence);
  divide(grid, 1, width, 1, height, getOrientation(width, height), makeFence);
};

export const getOrientation = (width, height) => {
  // const horizontal = 1;
  // const vertical = 2;
  if (width < height) {
    return HORIZONAL;
  } else if (width > height) {
    return VERTICAL;
  } else {
    return Math.random() >= 0.5 ? HORIZONAL : VERTICAL;
  }
};

export const outerFences = (grid, width, height, makeFence) => {
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
    makeFence(node);
  });
};

export const divide = function (
  grid,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  orientation,
  makeFence
) {
  const [S, E] = [1, 2];

  let dir = orientation === 'vertical' ? S : E;
  if (orientation === 'vertical') {
    const [min, max] = [1, orientation === 'vertical' ? colEnd : rowEnd];

    let randomRowIndex = Math.floor(min + Math.random() * max);
    let currentRow = grid[randomRowIndex];
    let randomPassageIndex = Math.random() * (currentRow.length - min) + min;
    // remove border clash
    const borderlessCurrentRow = currentRow.slice(1, -1);
    // random hole in column
    const randomPassage = borderlessCurrentRow.splice(randomPassageIndex, 1);
    borderlessCurrentRow.forEach((node) => {
      makeFence(node);
    });
    let startToNDist = Math.abs(rowStart - randomRowIndex - 2);
    let nToEndDist = Math.abs(rowEnd - randomRowIndex + 2);
    if (startToNDist < nToEndDist) {
      divide(
        grid,
        randomRowIndex - 2,
        rowEnd,
        colStart,
        colEnd,
        'horizontal',
        makeFence
      );
    } else {
      divide(
        grid,
        randomRowIndex + 2,
        rowEnd,
        colStart,
        colEnd,
        'horizontal',
        makeFence
      );
    }
  } else {
    const [min, max] = [1, orientation === 'vertical' ? colEnd : rowEnd];

    let randomRowIndex = Math.floor(min + Math.random() * max);
    let currentRow = grid[randomRowIndex];
    let randomPassageIndex = Math.random() * (currentRow.length - min) + min;
    // remove border clash
    const borderlessCurrentRow = currentRow.slice(1, -1);
    // random hole in column
    const randomPassage = borderlessCurrentRow.splice(randomPassageIndex, 1);
    borderlessCurrentRow.forEach((node) => {
      makeFence(node);
    });
    let startToNDist = Math.abs(rowStart - randomRowIndex - 2);
    let nToEndDist = Math.abs(rowEnd - randomRowIndex + 2);
    if (startToNDist < nToEndDist) {
      divide(
        grid,
        randomRowIndex - 2,
        rowEnd,
        colStart,
        colEnd,
        'horizontal',
        makeFence
      );
    }
  }
  // return borderlessCurrentRow;
};
