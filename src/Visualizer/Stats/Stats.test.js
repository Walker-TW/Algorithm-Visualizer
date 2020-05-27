import React from "react";
import Stats from "./Stats";
import { shallowToJson } from "enzyme-to-json";
import { shallow, mount, render } from "enzyme";

describe("<Stats />", () => {
  it("renders", () => {
    const wrapper = shallow(<Stats />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
