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
      <img src="https://f0.pngfuel.com/png/858/267/round-black-maze-png-clip-art.png" width="120" height="120" alt="icon">
  </a>

  <h3 align="center">Algorithm Visualiser</h3>

  <p align="center">
    An interactive visualiser which demonstrates the pro's and con's of various graph solving algorithms.
 
  </p>
</p>

<div align= "center">

[_About The Project_](#About-The-Project)| [_Getting Started_](#Getting-Started) | [_How To Use_](#How-To-Use) | [_Notes On Databases_](#Notes-on-Databases) | [_Features_](#Features) | [_License_](#license)

Play with it [here:](https://algo-visualiser.herokuapp.com)

</div>

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

## License

Distributed under the MIT License. See `LICENSE` for more information.

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/Walker-TW/Algorithm-Visualizer/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[javascriptcommits]: https://img.shields.io/badge/JavaScript-yellow.svg
[jest]: https://img.shields.io/badge/Jest-red.svg
[csscommits]: https://img.shields.io/badge/CSS-green.svg
[bootstrapcommits]: https://img.shields.io/badge/Bootstrap-blueviolet.svg
[reactjscommits]: https://img.shields.io/badge/ReactJS-informational.svg
