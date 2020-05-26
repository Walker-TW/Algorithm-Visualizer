const divide = (
  grid,
 x,y,
  width,
  height,
  orientation
) => {
  if (width < 4 || height < 4) return;

  let vertical = orientation === VERTICAL;
  //  how long will the wall be?
  let length = vertical ? height : width;

  const min = 1;
  const max = vertical ? width - 2 : height - 2;

  //  random column
  let wx = x + (vertical ? Math.floor(min + Math.random() * max) : 0);
  let wy = y + (vertical ? 0 : Math.floor(min + Math.random() * max));
  // passage
  let px = wx + (vertical ? 0 : Math.floor(min + Math.random() * max));
  let py = wy + (vertical ? Math.floor(min + Math.random() * max) : 0);

  // what direction will the wall be drawn?
  let dx = vertical ? 0 : 1;
  let dy = vertical ? 1 : 0;

  // what direction is perpendicular to the wall?
  let dir = vertical ? S : E;

  for (let i = 0; i <= length; i++) {
    if (wx !== px || wy !== py) {
      grid[wy][wx] |= dir;
      wx += dx;
      wy += dy;
    }
  }

  let [nx, ny] = [x, y];
  let [w, h] = vertical ? [wx - x + 1, height] : [width, wy - y + 1];

  divide(grid, nx, ny, w, h, getOrientation(w, h));

  [nx, ny] = vertical ? [wx + 1, y] : [x, wy + 1];
  [w, h] = vertical
    ? [x + width - wx - 1, height]
    : [width, y + height - wy - 1];
  divide(grid, nx, ny, w, h, getOrientation(w, h));