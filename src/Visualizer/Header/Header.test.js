import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

import Header from './Header';

const runSpy = jest.fn(() => {});
const fenceToggleSpy = jest.fn(() => {});
const resetSpy = jest.fn(() => {});
const setAlgorithmSpy = jest.fn(() => {});
const mazeBuildSpy = jest.fn(() => {});

const defaultProps = {
  algorithm: '',
  run: runSpy,
  fenceToggle: fenceToggleSpy,
  reset: resetSpy,
  setAlgorithm: setAlgorithmSpy,
  ready: false,
  mazeBuild: mazeBuildSpy,
};

const readyProps = {
  ...defaultProps,
  algorithm: 'dijkstra',
  ready: true,
};

describe('<Header />', () => {
  const wrapper = shallow(<Header {...defaultProps} />);

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the run spy onclick', () => {
    const jsdomAlert = window.alert;
    window.alert = jest.fn();

    const wrapper = mount(<Header {...readyProps} />);
    wrapper.find('#run-btn').last().simulate('click');

    expect(runSpy.mock.calls.length).toEqual(1);
    window.alert = jsdomAlert;
  });

  it('calls the wall toggle spy onclick', () => {
    wrapper
      .find('#fence-check')
      .simulate('change', { target: { checked: true } });
    expect(fenceToggleSpy.mock.calls.length).toEqual(1);
  });

  it('calls the reset spy onclick', () => {
    wrapper.find('#reset-btn').simulate('click');
    expect(resetSpy.mock.calls.length).toEqual(1);
  });

  it('calls the set algorithm spy onclick', () => {
    wrapper.find('#set-dijkstra').simulate('click');
    wrapper.find('#set-astar-manhatten').simulate('click');
    wrapper.find('#set-astar-euclidean').simulate('click');
    expect(setAlgorithmSpy.mock.calls.length).toEqual(3);
  });
  it('calls the maze building spy onclick', () => {
    wrapper.find('#maze-btn').simulate('click');
    expect(mazeBuildSpy.mock.calls.length).toEqual(1);
  });
});
