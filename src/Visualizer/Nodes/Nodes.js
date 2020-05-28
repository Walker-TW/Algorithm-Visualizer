import React, { useEffect, useState } from "react";
import Node from "../Node/Node";
import PropTypes from "prop-types";

import "./Grid.css";

const Nodes = (props) => {
  const [grid, setGrid] = useState([]);
  const {
    grid: propsGrid,
    fenceToggle,
    gridHasStart,
    gridHasFinish,
    mouseToggle,
    nodeFlag,
    mouseFlag,
    updateNode,
  } = props;

  useEffect(
    (propsGrid) => {
      return (
        () => {
          setGrid(propsGrid);
        },
        console.log("")
      );
    },
    [propsGrid, grid]
  );

  return (
    <div className="Grid">
      {propsGrid.map((row, colIndex) => {
        return (
          <div className="Column" key={colIndex.toString()}>
            {row.map((node, rowIndex) => (
              <Node
                key={colIndex.toString() + " " + rowIndex.toString()}
                id={`node-${node.gridId.colIndex}-${node.gridId.rowIndex}`}
                gridId={node.gridId}
                gridHasStart={gridHasStart}
                gridHasFinish={gridHasFinish}
                fenceToggle={fenceToggle}
                nodeFlag={nodeFlag}
                mouseFlag={mouseFlag}
                updateNode={updateNode}
                mouseToggle={mouseToggle}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

Nodes.propTypes = {
  grid: PropTypes.array.isRequired,
  gridHasStart: PropTypes.bool.isRequired,
  gridHasFinish: PropTypes.bool.isRequired,
  nodeFlag: PropTypes.func.isRequired,
  mouseFlag: PropTypes.func.isRequired,
  mouseToggle: PropTypes.bool.isRequired,
  fenceToggle: PropTypes.bool.isRequired,
};

export default Nodes;
