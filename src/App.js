import React, { Component } from 'react';
import Grid from './Grid/Grid';
import './App.css';

export default class App extends Component {
  state = {
    isDesktop: false,
  };

  componentDidMount() {
    this.updatePredicate();
    window.addEventListener('resize', () => this.updatePredicate);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', () => this.updatePredicate);
  }

  updatePredicate = () => {
    this.setState({ isDesktop: window.innerWidth > 1450 });
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
    const size = window.innerWidth;
    const desktopResize = {
      width: size > 1450 ? size / 20 - 3 : size / 40 - 3,
      height:
        size > 1450 ? window.innerHeight / 20 - 8 : window.innerHeight / 40 - 8,
    };

    const mobileResize = {
      width: window.innerWidth / 40 - 3,
      height: window.innerHeight / 40 - 8,
    };

    return (
      <div className="App">
        {console.log(desktopResize)}
        <Grid view={desktopResize} />
      </div>
    );
  }
}
