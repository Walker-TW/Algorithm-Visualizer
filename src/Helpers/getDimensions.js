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
const maxFill = (value, nodeSize) => {
  return Math.floor((value - GRID_PADDING) / nodeSize);
};
export const getDimensions = (nodeSize) => {
  let size = nodeSize ? nodeSize : defaultNodeSize();
  if (fullSize) {
    [width, height] = [
      adjustedWidth(screenWidth, size),
      adjustedHeight(FULL_SIZE_NAV_HEIGHT, size),
    ];
  } else if (midSize) {
    [width, height] = [
      adjustedWidth(screenWidth, size),
      adjustedHeight(MID_SIZE_NAV_HEIGHT, size),
    ];
  } else if (thinSize) {
    [width, height] = [
      adjustedWidth(screenWidth, size),
      adjustedHeight(THIN_SIZE_NAV_HEIGHT, size),
    ];
  } else {
    [width, height] = [maxFill(screenWidth, size), maxFill(screenHeight, size)];
  }

  return [width, height];
};

export const defaultNodeSize = () => {
  let nodeSize;

  if (thinSize) nodeSize = 20;
  else if (tablet) nodeSize = 30;
  else nodeSize = 40;

  return nodeSize;
};

export default getDimensions;
