export const recursiveDivision = (grid, start, end) => {
  const [width, height] = [grid.length, grid[0].length];
  const orientation = getOrientation(width, height);
};

export const getOrientation = (width, height) => {
  if (width < height) {
    return 'horizontal';
  } else {
    return 'vertical';
  }
};

const divide = (grid, x, y, width, height, orientation) => {
  return;
};
