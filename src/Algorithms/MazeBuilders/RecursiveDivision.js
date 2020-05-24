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

export const borderFences = (grid, width, height) => {
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
  console.log(fences[0], 'fences');
  return fences;
};

const divide = (grid, x, y, width, height, orientation) => {
  return;
};
