<h2 align="center"> The Algo-Visualiser</h2>

<div align="center"> 

[![JavaScript commits][javascriptcommits]](https://sourcerer.io/walker-tw)
[![Jest][jest]](https://sourcerer.io/basselalsayed)
[![CSS commits][csscommits]](https://sourcerer.io/walker-tw)
[![Bootstrap commits][bootstrapcommits]](https://sourcerer.io/basselalsayed)
[![reactJS commits][reactjscommits]](https://sourcerer.io/basselalsayed)
[![MIT License][license-shield]][license-url]

</div>

<p align="center">
  <a href="https://github.com/Walker-TW/Algorithm-Visualizer">
      <img src='public/readMeImage.jpeg' width="200" height="200" alt="icon">
  </a>

  <p align="center">
    An interactive visualiser which demonstrates the pro's and con's of various graph solving algorithms.
  </p>
</p>

<div align= "center">

[_About The Project_](#About-The-Project) | [_Features_](#Features) | [_Getting Started_](#Getting-Started) | [_How To Use_](#How-To-Use) | [_The Algorithms_](#The-Algorithms) | [_Contact The Team_](#Contact-The-Team) | [_License_](#license)

It is deployed via Netlify [here:](https://the-algorithm-visualizer.netlify.app/)

</div>

## About The Project

The Algo-Visualiser is a web app built in ReactJS that shows how various graph traversal algorithm work. It was built by [Bassel Al-Sayed](https://github.com/basselalsayed) and [Tom Walker](https://github.com/Walker-TW) out of a mutual wish to understand ReactJS and GPS systems and these algorithms together.

## Features

- Users can select a maze size (which will scale with their screen/phone size).
- Users can select a start and end point for the maze.
- Then add fences (obstructions for the algorithm).
- Then one of the 5 available algorithms is chosen.
- The algorithm is then run with the nodes searched coloured in.
- And then shortest path (found by the selected algorithm) drawn in a new colour.
- The grid can then be reset (keeping the fences and start/end nodes) to allow comparison of algorithms.
- Users can view benchmarking statistics for each run of an algorithm to compare against other algorithms using the same grid.

## Getting Started:

1. Clone the repo by running

   `git clone https://github.com/Walker-TW/Algorithm-Visualizer.git`

2. Change into the cloned directory

   `cd Algorithm-Visualizer`

3. Install dependencies

   `yarn`

4. Booting the server:
   1. For hot reload during development (or quick start):
   - Boot the server with `yarn start`
   - Navigate to [http://localhost:3000](http://localhost:3000) in your browser.
     - The rendered page will update as you make changes
     - You will also see any lint errors in the console.
   2. To view the optimised build
   - run `yarn build`, then
   - Boot with `serve -s build`.
     1. You can install serve globally with `yarn global add serve` or `npm i -g serve`, it's handy to have around.

### Testing

`yarn test`

Launches the test runner ([react-scripts jest](https://create-react-app.dev/docs/running-tests/) with [enzyme](https://enzymejs.github.io/enzyme/)) in the interactive watch mode.

At time of writing, jest can be buggy with coverage in watch mode so for accurate coverage run `yarn test:coverage`

## The Algorithms

The algorithms demonstrated within the project are all graph traversal algorithms.

### Dijkstra

An algorithm that is weighted and will always find the shortest path. Works by spreading out and determining the shortest 'distance' to the final node by adding up the traversed weights.

### A\*

An upgraded version of Dijkstra that takes the distance value of each node and combines it with a heuristic value to determine not just the distance to the finish node but the direction that it should take. Two types of heuristics are used in our project the Manhattan distance & the Euclidean distance. It will always find the shortest path when using the correct heuristic.

<h4><ins> Euclidean </ins></h4>

AKA 'as the crow flies' is a heuristic used in most straight line mazes. It uses the Pythagorean theorem on a triangle created from the two points that you wish to get to Point A (start point) & Point B (destination).

`sqrt((x2-x1)^2 + (y2-y1)^2)`

However because our grid is only traversable on horizontal or vertical vertices using this heurtistic will NOT always give the shortest path, though it will be much faster than other heuristics.

<h4><ins> Manhattan </ins></h4>

AKA the taxi-cab distance will only work on a grid system unlike the euclidean, this heuristic is calculated by taking the absolute values of subtracting the x & y values of two points on our triangle and then adding the result together. This allows a better relative distance.

`|(x2-x1)| + |(y2-y1)|`

Because Manhattan moves only in horizontal or vertical verticies it will always find the shortest path. However it will be much slower than Euclidean so if speed is an issue (especially in huge graphs) while accurancy is not choose Euclidean.

### Breadth First Search

Is a graph traversal algorithm which will search all neighbour nodes (in this projects case north/east/west/south) of the main node before moving onto the next level. This will cause a spreading out effect and means that along a maze BRS will explore all diversions that it comes across. It will find the shortest path.

### Depth First Search

The brother of Breadth First Search it will not explore all neighbour nodes instead exploring all along a branch before backtracking to other non-visited nodes. Depth first search is the only algorithm listed which will NOT find the shortest path.

## Contact The Team

<h4> <ins>Tom Walker </ins> </h4>

[![LinkedIn][linkedin-shield]][linkedin-urltw]
<a href="https://github.com/Walker-TW"><img src="https://github.com/Walker-TW/CV/blob/master/images/GitHub-120px.png"  height="20" width="20">
</a>

<h4> <ins>Bassel Al-Sayed </ins> </h4>

[![LinkedIn][linkedin-shield]][linkedin-urlbas]
<a href="https://github.com/basselalsayed"><img src="https://github.com/Walker-TW/CV/blob/master/images/GitHub-120px.png"  height="20" width="20">
</a>

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

This project was inspired by a video from Clément Mihailescu please visit his youtube channel [here](https://www.youtube.com/channel/UCaO6VoaYJv4kS-TQO_M-N_g)

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/Walker-TW/Algorithm-Visualizer/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-urltw]: https://linkedin.com/in/thomas-w-walker
[linkedin-urlbas]: https://linkedin.com/in/bsas
[javascriptcommits]: https://img.shields.io/badge/JavaScript-yellow.svg
[jest]: https://img.shields.io/badge/Jest-red.svg
[csscommits]: https://img.shields.io/badge/CSS-green.svg
[bootstrapcommits]: https://img.shields.io/badge/Bootstrap-blueviolet.svg
[reactjscommits]: https://img.shields.io/badge/ReactJS-informational.svg
