import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount, render } from 'enzyme';

import Header from './Header';

const defaultProps = {
  run: () => {},
};
describe('<Header />', () => {
  it('renders', () => {
    const wrapper = shallow(<Header {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
