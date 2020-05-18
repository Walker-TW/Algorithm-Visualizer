import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

import Header from './Header';

const runSpy = jest.fn(() => {});
const fenceToggleSpy = jest.fn(() => {});
const resetSpy = jest.fn(() => {});
const setAlgorithmSpy = jest.fn(() => {});

const defaultProps = {
  alforithm: '',
  run: runSpy,
  fenceToggle: fenceToggleSpy,
  reset: resetSpy,
  setAlgorithm: setAlgorithmSpy,
};

describe('<Header />', () => {
  const wrapper = shallow(<Header {...defaultProps} />);

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the run spy onclick', () => {
    wrapper.find('#button').simulate('click');
    expect(runSpy.mock.calls.length).toEqual(1);
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
    wrapper.find('#set-astar').simulate('click');
    expect(setAlgorithmSpy.mock.calls.length).toEqual(2);
  });
});
