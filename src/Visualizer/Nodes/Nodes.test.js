import React from 'react';
import Nodes from './Nodes';
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
  updateNode: () => {},
};

describe('<Nodes />', () => {
  const nodes = shallow(<Nodes {...defaultProps} />);
  it('renders', () => {
    expect(shallowToJson(nodes)).toMatchSnapshot();
  });
});
