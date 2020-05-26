const [min, max] = [1, 10];
//  random column
// let newFences = grid[Math.floor(Math.random() * (max - min) + min)];
// random hole in column

// const popRandom = (array) => {
//   let i = (Math.random() * array.length) | 0;
//   return array.splice(i, 1)[0];
// };
let newFences = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let fencePassage = newFences.splice(
  Math.floor(Math.random() * (newFences.length - min) + min),
  1
);
