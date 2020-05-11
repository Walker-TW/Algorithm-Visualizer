import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { shallow, mount, render } from "enzyme";

import Header from "./Header";

describe("<Header />", () => {
  it("renders", () => {
    const wrapper = mount(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
