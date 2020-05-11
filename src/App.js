import React, { Component } from "react";
import Grid from "./Grid/Grid";
import Header from "./Header/Header";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid />
      </div>
    );
  }
}
