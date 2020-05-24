export const recursiveDivision = (grid, start, end) => {
  const [width, height] = [grid.length, grid[0].length];
  let fences = outerFences(grid, width, height);
  // let fences = [];

  const orientation = getOrientation(width, height);
  fences = [...fences, ...divide(grid, width, height, orientation)];
  console.log(fences, 'fences');
  return fences;
};

export const getOrientation = (width, height) => {
  if (width < height) {
    return 'horizontal';
  } else {
    return 'vertical';
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

const divide = (grid, width, height, orientation) => {
  let vertical = orientation === 'vertical';
  if (vertical) {
    const [min, max] = [1, width - 2];
    //  random column
    let newFences = grid[Math.floor(min + Math.random() * max)];
    // remove border clash
    const borderedNewFences = newFences.slice(1, -1);
    // random hole in column

    borderedNewFences.splice(
      Math.floor(Math.random() * (newFences.length - min) + min),
      1
    );

    return borderedNewFences;
  }
};
