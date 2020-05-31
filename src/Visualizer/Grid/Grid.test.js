import React from 'react';
import Grid from './Grid';
import { shallowToJson } from 'enzyme-to-json';

import { shallow, mount, render } from 'enzyme';

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
