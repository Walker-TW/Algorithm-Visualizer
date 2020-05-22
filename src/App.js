import React, { Component } from 'react';
import Grid from './Grid/Grid';
import './App.css';
import { withSize } from 'react-sizeme';

const withSizeHOC = withSize();
const SizeAwareGrid = withSizeHOC(Grid);

export default class App extends Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight,
    isDesktop: false,
  };

  componentDidMount() {
    this.updatePredicate();
    window.addEventListener('resize', this.updatePredicate);
  }
  // componentDidUpdate() {
  //   window.addEventListener('resize', this.updatePredicate);
  // }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePredicate);
  }

  updatePredicate = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      isDesktop: window.innerWidth > 1450,
    });
  };
  resize = () => {
    if (window.innerWidth > 1450) {
      return {
        width: window.innerWidth / 20 - 3,
        height: window.innerHeight / 20 - 8,
      };
    } else {
      return {
        width: window.innerWidth / 40 - 3,
        height: window.innerHeight / 40 - 8,
      };
    }
  };
  render() {
    const { width, height } = this.state;
    return (
      <div className="App">
        {/* {console.log(desktopResize)} */}
        <Grid view={{ width, height }} />
        {/* <SizeAwareGrid view={desktopResize} /> */}
      </div>
    );
  }
}
