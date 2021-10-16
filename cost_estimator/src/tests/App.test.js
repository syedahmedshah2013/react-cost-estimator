import React from "react";
import { shallow, mount } from "enzyme";
import App from "../components/App";

import toJson from "enzyme-to-json";
import Header from "../components/Header";

it("renders without crashing", () => {
    shallow(<App />);
});

it("render App header without any error", () => {
    const wrapper = shallow(<Header />);
    const headerLogo = (<img src="/assets/images/alasco-logo.png" alt="" width="192" height="30" className="d-inline-block align-text-top" />);
    expect(wrapper.contains(headerLogo)).toEqual(true);
});