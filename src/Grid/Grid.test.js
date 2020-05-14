import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount, render } from 'enzyme';

import Grid from './Grid';
import Node from './Node/Node';

describe('<Grid />', () => {
  it('renders', () => {
    const wrapper = render(<Grid />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders all 1500 Node components', () => {
    const wrapper = mount(<Grid />);
    expect(wrapper.find(Node).length).toEqual(100);
  });

  it('render a node that will change the start state when clicked', () => {
    const wrapper = mount(<Grid />);
    const node = wrapper.find(Node);
    const test = node.first();
    expect(test.state().isStart).toEqual(false);
    test.simulate('click');
    expect(test.state().isStart).toEqual(true);
  });

  it('render a node that will change the finish state when clicked', () => {
    const wrapper = mount(<Grid />);
    const node = wrapper.find(Node);
    const test = node.first();
    expect(test.state().isFinish).toEqual(false);
    test.simulate('click');
    test.simulate('click');
    expect(test.state().isFinish).toEqual(true);
  });
});
