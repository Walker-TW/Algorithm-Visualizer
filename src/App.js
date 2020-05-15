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

  render() {
    const resize = {
      width: window.innerWidth / 20 - 1,
      height: window.innerHeight / 20 - 9,
    };

    return (
      <div className="App">
        <Grid view={resize} />
      </div>
    );
  }
}
