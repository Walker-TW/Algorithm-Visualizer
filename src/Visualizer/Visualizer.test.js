import React from 'react';

import matchMediaPolyfill from 'mq-polyfill';

import Visualizer from './';
import { Node } from './Components';

import { shallowToJson } from 'enzyme-to-json';

import { shallow, mount, render } from 'enzyme';

describe('<Visualizer />', () => {
  beforeAll(() => {
    matchMediaPolyfill(window);
    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height,
      }).dispatchEvent(new this.Event('resize'));
    };
  });
  function toggleFences(wrapper) {
    wrapper
      .find('input[type="checkbox"]')
      .simulate('change', { target: { checked: true } });
  }
  it('renders', () => {
    const wrapper = shallow(<Visualizer />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renders all 1500 Node components', () => {
    const wrapper = mount(<Visualizer />);
    // expect(wrapper.find(Node)).toEqual(true);
    expect(wrapper.find('.Node').length).toEqual(1188);
  });

  it('render a node that will change the start state when clicked', () => {
    const wrapper = mount(<Visualizer />);
    const node = wrapper.find(Node).first();

    expect(node.state('start')).toEqual(false);
    node.simulate('mousedown', 'mouseup');
    expect(node.state('start')).toEqual(true);
  });

  it('render a node that will change the finish state when clicked', () => {
    const wrapper = mount(<Visualizer />);
    const node = wrapper.find(Node).first();

    node.simulate('mousedown', 'mouseup');
    expect(wrapper.state().start.present).toEqual(true);
  });

  it('renders 1188 nodes on mobile', () => {
    window.resizeTo(375, 667);

    const wrapperTwo = mount(<Visualizer />);
    expect(wrapperTwo.find('.Node').length).toEqual(1188);
  });

  it('registers if a mouse is held', () => {
    const wrapper = mount(<Visualizer />);
    const node = wrapper.find(Node).first();
    toggleFences(wrapper);

    node.simulate('mousedown', 'mouseenter');
    expect(wrapper.state('mouseToggle')).toEqual(true);
  });

  it('can add walls', () => {
    const wrapper = mount(<Visualizer />);
    toggleFences(wrapper);
    expect(wrapper.state().fenceToggle).toEqual(true);
  });

  it('can remove walls', () => {
    const wrapper = mount(<Visualizer />);

    toggleFences(wrapper);
    const findnode = wrapper.find('#node-0-0');
    const node = findnode.first();
    [1, 2].forEach(() => {
      node.simulate('click');
    });
    const nodeObj = wrapper.state().grid[0][0];
    expect(nodeObj.fence).toEqual(false);
  });
});
