import React, { useEffect, useState } from 'react';
import { Node } from '../';
import PropTypes from 'prop-types';

import './Grid.css';

const Grid = ({ grid: propsGrid, nodeProps }) => {
  const [grid, setGrid] = useState(propsGrid);

  useEffect((propsGrid) => setGrid(propsGrid), [propsGrid, grid]);

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
                {...nodeProps}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

Grid.propTypes = {
  grid: PropTypes.array.isRequired,
  nodeProps: PropTypes.object.isRequired,
};

export { Grid };
