import React from 'react';

import { Header } from './';

const runSpy = jest.fn(() => {});
const fenceToggleSpy = jest.fn(() => {});

const setAlgorithmSpy = jest.fn(() => {});
const animationSpeedSpy = jest.fn(() => {});
const resetFencesSpy = jest.fn(() => {});
const resetStartFinishSpy = jest.fn(() => {});
const resetVisitedSpy = jest.fn(() => {});
const resizeGridSpy = jest.fn(() => {});

const defaultProps = {
  algorithm: '',
  animationSpeed: animationSpeedSpy,
  device: 'desktop',
  fenceToggle: fenceToggleSpy,
  resetFences: resetFencesSpy,
  resizeGrid: resizeGridSpy,
  resetStartFinish: resetStartFinishSpy,
  resetVisited: resetVisitedSpy,
  run: runSpy,
  setAlgorithm: setAlgorithmSpy,
  speed: '5',
  ready: false,
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

  xit('calls the run spy onclick', () => {
    const jsdomAlert = window.alert;
    window.alert = jest.fn();

    const wrapper = mount(<Header {...readyProps} />);
    wrapper.find('#run-btn').last().simulate('click');
    setTimeout(expect(runSpy.mock.calls.length).toEqual(1), 1200);
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
    expect(resetVisitedSpy.mock.calls.length).toEqual(1);
  });

  it('calls the set algorithm spy onclick', () => {
    wrapper.find('#set-dijkstra').simulate('click');
    wrapper.find('#set-astar-m').simulate('click');
    wrapper.find('#set-astar-e').simulate('click');
    expect(setAlgorithmSpy.mock.calls.length).toEqual(3);
  });
});
