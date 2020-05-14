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
