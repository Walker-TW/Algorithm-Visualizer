const [screenWidth, screenHeight] = [window.innerWidth, window.innerHeight];
const GRID_PADDING = 40;
const FULL_SIZE_NAV_HEIGHT = 48;
const MID_SIZE_NAV_HEIGHT = 104;
const THIN_SIZE_NAV_HEIGHT = 104;
const STATS_HEIGHT = 83;

let width, height;

const fullSize = screenWidth > 1654;
const midSize = screenWidth > 1212;
const thinSize = screenWidth > 991;
const tablet = screenWidth > 414;

const adjustedHeight = (navHeight, nodeSize) => {
  return Math.floor(
    (screenHeight - GRID_PADDING - navHeight - STATS_HEIGHT) / nodeSize
  );
};
const adjustedWidth = (screenWidth, nodeSize) => {
  return Math.floor(Math.floor((screenWidth - GRID_PADDING) * 0.9) / nodeSize);
};
export const maxFill = (value, nodeSize) => {
  return Math.floor((value - GRID_PADDING) / nodeSize);
};

export const getDimensions = (nodeSize) => {
  let size = nodeSize ? nodeSize : defaultNodeSize;
  [width, height] = fullSize
    ? [
        adjustedWidth(screenWidth, size),
        adjustedHeight(FULL_SIZE_NAV_HEIGHT, size),
      ]
    : midSize
    ? [
        adjustedWidth(screenWidth, size),
        adjustedHeight(MID_SIZE_NAV_HEIGHT, size),
      ]
    : thinSize
    ? [
        adjustedWidth(screenWidth, size),
        adjustedHeight(THIN_SIZE_NAV_HEIGHT, size),
      ]
    : [maxFill(screenWidth, size), maxFill(screenHeight, size)];

  return [width, height];
};

export const defaultNodeSize = thinSize ? 20 : tablet ? 30 : 40;

export default getDimensions;
