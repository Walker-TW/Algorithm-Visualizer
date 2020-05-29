const [screenWidth, screenHeight] = [window.innerWidth, window.innerHeight];
let width, height;

export const getDimensions = () => {
  if (screenWidth > 1450) {
    [width, height] = [screenWidth / 20 - 12, screenHeight / 20 - 16];
  } else if (screenWidth > 900) {
    [width, height] = [screenWidth / 30 - 5, screenHeight / 30 - 11];
  } else {
    [width, height] = [screenWidth / 40 - 2, screenHeight / 40 - 8];
  }
  return [width, height];
};

export const getMax = () => {
  if (screenWidth > 1450) {
    [width, height] = [screenWidth / 20, screenHeight / 20];
  } else if (screenWidth > 900) {
    [width, height] = [screenWidth / 30, screenHeight / 30];
  } else {
    [width, height] = [screenWidth / 40 - 3, screenHeight / 40 - 5];
  }
  return [width, height];
};

export default getDimensions;
