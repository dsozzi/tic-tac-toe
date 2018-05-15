import React from "react";
import ReactDOM from "react-dom";
import Box from "../components/Box";
import { mount } from "enzyme";

it("check if player 1 is equal to O", () => {
    const wrapper = mount(<Box rowIdx={0} boxIdx={0} value={1} onClick={() => null} />);
    expect(wrapper.text()).toBe("O");
});

it("check if player -1 is equal to X", () => {
    const wrapper = mount(<Box rowIdx={0} boxIdx={0} value={-1} onClick={() => null} />);
    expect(wrapper.text()).toBe("X");
});

it("check if the row index prop is correct", () => {
    const wrapper = mount(<Box rowIdx={0} boxIdx={0} value={-1} onClick={() => null} />);
    expect(wrapper.props().rowIdx).toBe(0);
});

it("check if the box index prop is correct", () => {
    const wrapper = mount(<Box rowIdx={0} boxIdx={1} value={-1} onClick={() => null} />);
    expect(wrapper.props().boxIdx).toBe(1);
});
