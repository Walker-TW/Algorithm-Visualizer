const divide = (grid, rowStart, rowEnd, colStart, colEnd, orientation) => {
  let wallsToAnimate = [];
  if (orientation === 'horizontal') {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    grid.forEach((row) => {
      row.forEach((node) => {
        // let r = parseInt(node.split('-')[0]);
        // let c = parseInt(node.split('-')[1]);
        let { rowIndex: r, colIndex: c } = node;
        if (
          r === currentRow &&
          c !== colRandom &&
          console.log();
          
          c >= colStart - 1 &&
          c <= colEnd + 1
        ) {
          if (!node.start && !node.finish) wallsToAnimate.push(node);
        }
      });
    });
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      divide(grid, rowStart, currentRow - 2, colStart, colEnd, 'horizontal');
    } else {
      divide(grid, rowStart, currentRow - 2, colStart, colEnd, 'vertical');
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      divide(grid, currentRow + 2, rowEnd, colStart, colEnd, 'horizontal');
    } else {
      divide(grid, currentRow + 2, rowEnd, colStart, colEnd, 'vertical');
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    grid.forEach((row) => {
      row.forEach((node) => {
        // let r = parseInt(node.split('-')[0]);
        // let c = parseInt(node.split('-')[1]);
        let { rowIndex: r, colIndex: c } = node;

        if (
          c === currentCol &&
          r !== rowRandom &&
          r >= rowStart - 1 &&
          r <= rowEnd + 1
        ) {
          if (!node.start && !node.finish) wallsToAnimate.push(node);
        }
      });
    });
    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      divide(grid, rowStart, rowEnd, colStart, currentCol - 2, 'horizontal');
    } else {
      divide(grid, rowStart, rowEnd, colStart, currentCol - 2, 'vertical');
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      divide(grid, rowStart, rowEnd, currentCol + 2, colEnd, 'horizontal');
    } else {
      divide(grid, rowStart, rowEnd, currentCol + 2, colEnd, 'vertical');
    }
  }
};
