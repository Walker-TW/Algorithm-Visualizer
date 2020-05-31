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

export const getDimensions = (nodeSize) => {
  let size = nodeSize ? nodeSize : defaultNodeSize();
  if (fullSize) {
    console.log('fullsize');
    [width, height] = [
      Math.floor((screenWidth - GRID_PADDING) / size),
      Math.floor(
        (screenHeight - GRID_PADDING - FULL_SIZE_NAV_HEIGHT - STATS_HEIGHT) /
          size
      ),
    ];
  } else if (midSize) {
    console.log('mid');
    [width, height] = [
      Math.floor((screenWidth - GRID_PADDING) / size),
      Math.floor(
        (screenHeight - GRID_PADDING - MID_SIZE_NAV_HEIGHT - STATS_HEIGHT) /
          size
      ),
    ];
  } else if (thinSize) {
    console.log('thin');
    [width, height] = [
      Math.floor((screenWidth - GRID_PADDING) / size),
      Math.floor(
        (screenHeight - GRID_PADDING - THIN_SIZE_NAV_HEIGHT - STATS_HEIGHT) /
          size
      ),
    ];
  } else {
    console.log('tab mobile');
    [width, height] = [
      Math.floor((screenWidth - GRID_PADDING) / size),
      Math.floor((screenHeight - GRID_PADDING) / size),
    ];
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
