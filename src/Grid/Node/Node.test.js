import React from "react";
import renderer from "react-test-renderer";
import Node from "./Node";
import { shallowToJson } from "enzyme-to-json";

import { shallow, mount, render } from "enzyme";

const defaultProps = {
  gridId: { colIndex: 0, rowIndex: 10 },
  flagStart: () => {},
  flagFinish: () => {},
};

describe("node", () => {
  const node = shallow(<Node {...defaultProps} />);
  it("Test that Node renders", () => {
    expect(shallowToJson(node)).toMatchSnapshot();
  });

  it("starts with required states", () => {
    expect(node.state().start).toEqual(false);
    expect(node.state().finish).toEqual(false);
    expect(node.state().distance).toEqual(Infinity);
    expect(node.state().visited).toEqual(false);
  });
});
