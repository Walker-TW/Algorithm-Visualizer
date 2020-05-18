import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount, render } from 'enzyme';

import Grid from './Grid';
import Node from './Node/Node';
import Header from './Header/Header';

const mobile = { width: 18, height: 28 };
const desktop = { width: 50, height: 30 };

describe('<Grid view={desktop} />', () => {
  it('renders', () => {
    const wrapper = render(<Grid view={desktop} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders all 1500 Node components', () => {
    const wrapper = shallow(<Grid view={desktop} />);

    expect(wrapper.find(Node).length).toEqual(1500);
  });

  it('render a node that will change the start state when clicked', () => {
    const wrapper = mount(<Grid view={desktop} />);
    const node = wrapper.find(Node);
    const test = node.first();
    expect(test.state().start).toEqual(false);
    test.simulate('mousedown', 'mouseup');
    expect(test.state().start).toEqual(true);
  });

  it('render a node that will change the finish state when clicked', () => {
    const wrapper = mount(<Grid view={desktop} />);
    const node = wrapper.find(Node);
    const test = node.first();
    test.simulate('mousedown', 'mouseup');
    expect(wrapper.state().start.present).toEqual(true);
  });

  it('renders 1400 nodes on mobile', () => {
    const wrapperTwo = shallow(<Grid view={mobile} />);
    expect(wrapperTwo.find(Node).length).toEqual(504);
  });

  it('can add walls', () => {
    const wrapper = mount(<Grid view={desktop} />);

    wrapper
      .find('input[type="checkbox"]')
      .simulate('change', { target: { checked: true } });
    expect(wrapper.state().fenceToggle).toEqual(true);
  });
  it('can remove walls', () => {
    const wrapper = mount(<Grid view={desktop} />);

    wrapper
      .find('input[type="checkbox"]')
      .simulate('change', { target: { checked: true } });
    const findnode = wrapper.find('#node-0-0');
    const node = findnode.first();
    [1, 2].forEach(() => {
      node.simulate('click');
    });
    const nodeobj = wrapper.state().grid[0][0];
    expect(nodeobj.fence).toEqual(false);
  });
});
