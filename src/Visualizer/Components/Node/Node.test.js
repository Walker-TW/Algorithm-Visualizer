import React from 'react';
import { Node } from './';
import { shallowToJson } from 'enzyme-to-json';

const nodeFlagSpy = jest.fn(() => {});

const defaultProps = {
  fenceToggle: false,
  gridId: { colIndex: 0, rowIndex: 10 },
  gridHasStart: false,
  gridHasFinish: false,
  mouseFlag: () => {},
  mouseToggle: false,
  nodeFlag: nodeFlagSpy,
  resetStartFinish: () => {},
  size: 20,
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
    node.simulate('mousedown', 'mouseup');
    expect(node.state().start).toEqual(true);
  });

  it('calls the nodeFlag method with gridId and a type', () => {
    nodeFlagSpy.mockClear();
    node.simulate('mousedown', 'mouseup');
    expect(nodeFlagSpy.mock.calls.length).toEqual(1);
    expect(nodeFlagSpy.mock.calls[0]).toEqual([
      { colIndex: 0, rowIndex: 10 },
      ['start'],
    ]);
  });
});
