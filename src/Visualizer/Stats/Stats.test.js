import React from 'react';
import Stats from './Stats';
import { shallowToJson } from 'enzyme-to-json';

describe('<Stats />', () => {
  it('renders', () => {
    const wrapper = shallow(<Stats />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
