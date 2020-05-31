const [screenWidth, screenHeight] = [window.innerWidth, window.innerHeight];
let width, height;

export const getDimensions = () => {
  if (screenWidth > 1450) {
    [width, height] = [
      Math.floor((screenWidth - 40) / 20),
      Math.floor((screenHeight - 40) / 20),
    ];
  } else if (screenWidth > 900) {
    [width, height] = [
      Math.floor((screenWidth - 40) / 30),
      Math.floor((screenHeight - 40) / 30),
    ];
  } else {
    [width, height] = [
      Math.floor((screenWidth - 40) / 40),
      Math.floor((screenHeight - 40) / 40),
    ];
  }
  return [width, height];
};

export const getMax = () => {
  if (screenWidth > 1450) {
    [width, height] = [
      Math.floor((screenWidth - 40) / 20),
      Math.floor((screenHeight - 40) / 20),
    ];
  } else if (screenWidth > 900) {
    [width, height] = [
      Math.floor((screenWidth - 40) / 30),
      Math.floor((screenHeight - 40) / 30),
    ];
  } else {
    [width, height] = [
      Math.floor((screenWidth - 40) / 40),
      Math.floor((screenHeight - 40) / 40),
    ];
  }
  return [width, height];
};

export default getDimensions;
