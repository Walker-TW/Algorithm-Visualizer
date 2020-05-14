import React from 'react';
import renderer from 'react-test-renderer';
import Node from './Node';
import { shallowToJson } from 'enzyme-to-json';

import { shallow, mount, render } from 'enzyme';

const defaultProps = {
  gridId: { colIndex: 0, rowIndex: 10 },
  gridHasStart: false,
  gridHasFinish: false,
  flagStart: () => {},
  flagFinish: () => {},
  updateNode: () => {},
  reset: () => {},
};

describe('<Node />', () => {
  const node = shallow(<Node {...defaultProps} />);
  it('Test that Node renders', () => {
    expect(shallowToJson(node)).toMatchSnapshot();
  });

  it('starts with required states', () => {
    expect(node.state().isStart).toEqual(false);
    expect(node.state().isFinish).toEqual(false);
  });
});
