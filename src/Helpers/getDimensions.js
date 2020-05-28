export const getDimensions = () => {
  const [screenWidth, screenHeight] = [window.innerWidth, window.innerHeight];

  let width, height;
  if (screenWidth > 1450) {
    width = screenWidth / 20 - 12;
    height = screenHeight / 20 - 7;
  } else if (screenWidth > 900) {
    width = screenWidth / 30;
    height = screenHeight / 30;
  } else {
    width = screenWidth / 40 - 3;
    height = screenHeight / 40 - 5;
  }
  return [width, height];
};

export default getDimensions;
