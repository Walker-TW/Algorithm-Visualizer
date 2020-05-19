# Algorithm Visualiser [![Build Status](https://travis-ci.org/Walker-TW/Algorithm-Visualizer.svg?branch=master)](https://travis-ci.org/Walker-TW/Algorithm-Visualizer)

View the deployed app [here:](https://algo-visualiser.herokuapp.com)

## `To run the project locally:

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

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

Additional info [here](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

Advanced users only, provides access to babel, webpack and other config files
