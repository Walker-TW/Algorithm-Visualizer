import React from 'react';
import renderer from 'react-test-renderer';
import Node from './Node';
import { shallowToJson } from 'enzyme-to-json';

import { shallow, mount, render } from 'enzyme';

const spyOne = jest.fn((gridId, type) => {});

const defaultProps = {
  gridId: { colIndex: 0, rowIndex: 10 },
  gridHasStart: false,
  gridHasFinish: false,
  nodeFlag: spyOne,
  reset: () => {},
  nodeStyle: '',
};

describe('<Node />', () => {
  const node = shallow(<Node {...defaultProps} />);
  it('Test that Node renders', () => {
    expect(shallowToJson(node)).toMatchSnapshot();
  });

  it('starts with required states', () => {
    expect(node.state().start).toEqual(false);
    expect(node.state().finish).toEqual(false);
  });

  it('responds to clicks', () => {
    node.simulate('click');
    expect(node.state().start).toEqual(true);
  });

  it('calls the nodeFlag method with gridId and a type', () => {
    spyOne.mockClear();
    node.simulate('click');
    expect(spyOne.mock.calls.length).toEqual(1);
    expect(spyOne.mock.calls[0]).toEqual([
      { colIndex: 0, rowIndex: 10 },
      'start',
    ]);
  });
});
