// import React from 'react';

// import App from './App';
// import matchMediaPolyfill from 'mq-polyfill';

// import { shallow, mount, render } from 'enzyme';

// describe('<App />', () => {
//   beforeAll(() => {
//     matchMediaPolyfill(window);
//     window.resizeTo = function resizeTo(width, height) {
//       Object.assign(this, {
//         innerWidth: width,
//         innerHeight: height,
//         outerWidth: width,
//         outerHeight: height,
//       }).dispatchEvent(new this.Event('resize'));
//     };
//   });

//   it('renders', () => {
//     const component = shallow(<App />);
//     expect(component).toMatchSnapshot();
//   });

//   it('Changes thr amount of nodes based on window size', () => {
//     window.resizeTo = jest.fn();
//     window.resizeTo(375, 667);
//     const wrapper = shallow(<App />);
//     console.log(wrapper);
//     expect(wrapper.find(Node).length).toEqual(504);
//   });
// });
