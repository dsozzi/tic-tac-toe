import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { mount } from "enzyme";

it("checks if App mounts correctly", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find("App")).toHaveLength(1);
});

it("checks if it's a winning combination", () => {
    const wrapper = mount(<App />);
    wrapper.setState({ gameStatus: [[1, 1, 1], [0, 0, 0], [0, 0, 0]] });
    wrapper.instance().handleClick(1, 1);
    expect(wrapper.state().gameEnded).toBe(true);
});

it("checks if it's NOT a winning combination", () => {
    const wrapper = mount(<App />);
    wrapper.setState({ gameStatus: [[0, 1, 1], [0, 0, 0], [0, 0, 0]] });
    wrapper.instance().handleClick(1, 1);
    expect(wrapper.state().gameEnded).toBe(false);
});

it("checks if state is correctly registered ", () => {
    const wrapper = mount(<App />);
    wrapper.setState({ gameStatus: [[1, 1, 1], [0, 0, 0], [0, 0, 0]] });
    expect(wrapper.state().gameStatus).toEqual([[1, 1, 1], [0, 0, 0], [0, 0, 0]]);
});
