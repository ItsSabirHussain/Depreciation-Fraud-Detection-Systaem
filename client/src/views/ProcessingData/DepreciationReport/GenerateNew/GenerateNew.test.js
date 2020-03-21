import React from "react";
import GenerateNew from "./GenerateNew";
import { mount } from "enzyme";

it("renders without crashing", () => {
  mount(<GenerateNew />);
});
