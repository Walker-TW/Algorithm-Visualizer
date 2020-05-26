const HORIZONAL = 1;
const VERTICAL = 2;
const [S, E] = [1, 2];

export const recursiveDivision = (grid, start, end) => {
  const [width, height] = [grid.length, grid[0].length];
  let fences = outerFences(grid, width, height);
  // let fences = [];

  // stop the maze getting too tight

  // fences = [...fences, ...divide(grid, width, height, orientation)];

  return divide(grid, width, height, getOrientation(width, height));
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

export const outerFences = (grid, width, height) => {
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
  return fences;
};

const divide = (
  grid,
  // rowStart,
  // rowEnd,
  // colStart,
  // colEnd,
  width,
  height,
  orientation
) => {
  const [min, max] = [1, orientation === 'vertical' ? height : width];

  let currentRow = grid[Math.floor(min + Math.random() * max)];
  // remove border clash
  const borderedNewFences = newFences.slice(1, -1);
  // random hole in column

  borderedNewFences.splice(
    Math.floor(Math.random() * (newFences.length - min) + min),
    1
  );

  return borderedNewFences;
};
