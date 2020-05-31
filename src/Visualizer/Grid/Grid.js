import React, { useEffect, useState } from 'react';
import Node from '../Node/Node';
import PropTypes from 'prop-types';

import './Grid.css';

const Grid = (props) => {
  const {
    grid: propsGrid,
    fenceToggle,
    gridHasStart,
    gridHasFinish,
    mouseToggle,
    nodeFlag,
    mouseFlag,
    updateNode,
    resetStartFinish,
  } = props;
  const [grid, setGrid] = useState(propsGrid);

  useEffect(
    (propsGrid) => {
      return (
        () => {
          setGrid(propsGrid);
        },
        console.log('Hope Your Enjoying The App!')
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
                key={colIndex.toString() + ' ' + rowIndex.toString()}
                id={`node-${node.gridId.colIndex}-${node.gridId.rowIndex}`}
                gridId={node.gridId}
                gridHasStart={gridHasStart}
                gridHasFinish={gridHasFinish}
                fenceToggle={fenceToggle}
                nodeFlag={nodeFlag}
                mouseFlag={mouseFlag}
                updateNode={updateNode}
                mouseToggle={mouseToggle}
                resetStartFinish={resetStartFinish}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

Grid.propTypes = {
  fenceToggle: PropTypes.bool.isRequired,
  grid: PropTypes.array.isRequired,
  gridHasStart: PropTypes.bool.isRequired,
  gridHasFinish: PropTypes.bool.isRequired,
  mouseFlag: PropTypes.func.isRequired,
  mouseToggle: PropTypes.bool.isRequired,
  nodeFlag: PropTypes.func.isRequired,
  resetStartFinish: PropTypes.func.isRequired,
};

export default Grid;
