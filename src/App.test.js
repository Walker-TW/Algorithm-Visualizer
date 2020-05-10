import React from "react";
import renderer from "react-test-renderer";
import App from "./App";

import { shallow, mount, render } from "enzyme";

test("App renders", () => {
  const component = renderer.create(<App />).toJSON();
  expect(component).toMatchSnapshot();
});

describe("Addition", () => {
  it("knows that 2 and 2 make 4", () => {
    expect(2 + 2).toBe(4);
  });
});

// what to test
// - that the nodes are in the grid AND/OR that the grid has rendered? XX
// - that the states of the nodes are what we want at the beginning XXX?
// - that all nodes are rendered with the Beginnning  state XXX
// - that the nodes change on click (as well as the state of the nodes as well)
// - that the start/finish nodes change when multiple clicked
