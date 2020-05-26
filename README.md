<br/>
<div align="center">

[![Build Status](https://travis-ci.org/Walker-TW/Algorithm-Visualizer.svg?branch=master)](https://travis-ci.org/Walker-TW/Algorithm-Visualizer)
[![JavaScript commits][javascriptcommits]](https://sourcerer.io/walker-tw)
[![Jest][jest]](https://sourcerer.io/walker-tw)
[![CSS commits][csscommits]](https://sourcerer.io/walker-tw)
[![Bootstrap commits][bootstrapcommits]](https://sourcerer.io/walker-tw)
[![reactJS commits][reactjscommits]](https://sourcerer.io/walker-tw)
[![MIT License][license-shield]][license-url]

</div>
<p align="center">
  <a href="https://github.com/Walker-TW/Algorithm-Visualizer">
      <img src="https://f0.pngfuel.com/png/858/267/round-black-maze-png-clip-art.png" width="200" height="200" alt="icon">
  </a>

  <h2 align="center">Algorithm Visualiser</h2>

  <p align="center">
    An interactive visualiser which demonstrates the pro's and con's of various graph solving algorithms.
 
  </p>
</p>

<div align= "center">

[_About The Project_](#About-The-Project) | [_Features_](#Features) | [_Getting Started_](#Getting-Started) | [_How To Use_](#How-To-Use) | [_Contact The Team_](#Contact-The-Team) | [_License_](#license)

Play with it [here:](https://algo-visualiser.herokuapp.com)

</div>

## About The Project

The Algorithm Visualiser is a web app built in ReactJS that shows hwo various graph traversal algorithm work. It was built by [Bassell Al-Sayed](https://github.com/basselalsayed) and [Tom Walker](https://github.com/Walker-TW) out of a mutual wish to understand ReactJS and these algorithm together.

## Features

- Users can select a maze size (which will scale with thier screen/phone size).
- Users can select a start and end point for the maze.
- Then add fences (obsturctions for the algorithm).
- Then one of the 5 available algorithms is chosen.
- The algorithm is then run with the nodes searched coloured in.
- And then shortest path (found by the selected algorithm) drawn in a new colour.
- The grid can then be reset (keeping the fences and start/end nodes) to allow comparison of algorithms.

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
   2. To view the optomised build
   - run `yarn build`, then
   - Boot with `serve -s build`.
     1. You can install serve globally with `yarn global add serve` or `npm i -g serve`, it's handy to have around.

### Testing

`yarn test`

Launches the test runner ([react-scripts jest](https://create-react-app.dev/docs/running-tests/) with [enzyme](https://enzymejs.github.io/enzyme/)) in the interactive watch mode.

At time of writing, jest can be buggy with coverage in watch mode so for accurate coverage run `yarn test:coverage`

## Contact The Team

<h4> Tom Walker </h4>

[![LinkedIn][linkedin-shield]][linkedin-urltw]
<a href="https://github.com/Walker-TW"><img src="https://github.com/Walker-TW/CV/blob/master/images/GitHub-120px.png"  height="20" width="20">
</a>

<h4>Bassel Al-Sayed </h4>

[![LinkedIn][linkedin-shield]][linkedin-urlbas]
<a href="https://github.com/basselalsayed"><img src="https://github.com/Walker-TW/CV/blob/master/images/GitHub-120px.png"  height="20" width="20">
</a>

## License

Distributed under the MIT License. See `LICENSE` for more information.

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
