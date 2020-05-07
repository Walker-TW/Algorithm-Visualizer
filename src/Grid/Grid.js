import React, { Component } from "react";
import Node from "./Node/Node";

import "./Grid.css";

export default class Grid extends Component {
  gridSetup = () => {
    let nodes = [];
    for (let row = 0; row < 50; row++) {
      let current_row = [];
      for (let col = 0; col < 30; col++) {
        current_row.push([]);
      }
      nodes.push(current_row);
    }
    return nodes;
  };

  render() {
    return (
      <div className="Grid">
        {this.gridSetup().map((row) => {
          return (
            <div className="Column">
              {row.map((col) => (
                <Node />
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}
