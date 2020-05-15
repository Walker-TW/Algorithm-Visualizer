import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount, render } from 'enzyme';

import Header from './Header';

const spy = jest.fn(() => {});
const defaultProps = {
  run: spy,
};
describe('<Header />', () => {
  const wrapper = shallow(<Header {...defaultProps} />);

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the spy onclick', () => {
    wrapper.simulate('click');
    expect(spy.mock.calls.length).toEqual(1);
  });
});
