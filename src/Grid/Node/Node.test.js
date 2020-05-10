import React from "react";
import renderer from "react-test-renderer";
import App from "./../../App";
import Grid from "./../Grid";
import Node from "./Node";
import { shallowToJson } from "enzyme-to-json";

import { shallow, mount, render } from "enzyme";

test("Node renders", () => {
  const component = renderer.create(<Node flagStart={{}} />).toJSON();

  expect(component).toMatchSnapshot();
});

describe("node", () => {
  const output = shallow(<Node />);
  const wrapper = mount(<Node />);
  it("Test that Node renders", () => {
    const output = shallow(<Node />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it("starts with required states", () => {
    expect(output.state().start).toEqual(false);
    expect(output.state().finish).toEqual(false);
    expect(output.state().distance).toEqual(Infinity);
    expect(output.state().visited).toEqual(false);
  });
});
