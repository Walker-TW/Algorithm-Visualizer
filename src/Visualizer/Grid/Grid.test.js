import React from 'react';
import Grid from './Grid';
import { shallowToJson } from 'enzyme-to-json';

const defaultProps = {
  grid: [],
  gridHasStart: false,
  gridHasFinish: false,
  nodeFlag: () => {},
  mouseFlag: () => {},
  mouseToggle: false,
  fenceToggle: false,
  resetStartFinish: () => {},
  updateNode: () => {},
};

describe('<Grid />', () => {
  const grid = shallow(<Grid {...defaultProps} />);
  it('renders', () => {
    expect(shallowToJson(grid)).toMatchSnapshot();
  });
});
