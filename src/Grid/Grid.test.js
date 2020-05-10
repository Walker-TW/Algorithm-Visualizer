import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { shallow, mount, render } from "enzyme";

import Grid from "./Grid";
import Node from "./Node/Node";

describe("<Grid />", () => {
  it("renders", () => {
    const wrapper = render(<Grid />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders all Node components", () => {
    const wrapper = mount(<Grid />);
    expect(wrapper.find(Node).length).toEqual(1500);
  });
});
