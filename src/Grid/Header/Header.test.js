import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount, render } from 'enzyme';

import Header from './Header';

const spy = jest.fn(() => {});
const spyTwo = jest.fn(() => {});

const defaultProps = {
  run: spy,
  fenceToggle: spyTwo,
  reset: () => {},
};
describe('<Header />', () => {
  const wrapper = shallow(<Header {...defaultProps} />);

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('run calls the spy onclick', () => {
    wrapper.find('#button').simulate('click');
    expect(spy.mock.calls.length).toEqual(1);
  });
  it('walls calls the spy onclick', () => {
    wrapper
      .find('#fence-check')
      .simulate('change', { target: { checked: true } });
    expect(spyTwo.mock.calls.length).toEqual(1);
  });
});
