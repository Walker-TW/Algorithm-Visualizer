import React from 'react';
import { Grid } from './';
import { shallowToJson } from 'enzyme-to-json';

const defaultProps = {
  grid: [],
  nodeProps: {},
};

describe('<Grid />', () => {
  const grid = shallow(<Grid {...defaultProps} />);
  it('renders', () => {
    expect(shallowToJson(grid)).toMatchSnapshot();
  });
});
