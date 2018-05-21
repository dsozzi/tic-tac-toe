import React from "react";
import ReactDOM from "react-dom";
import Status from "../components/Status";
import { mount } from "enzyme";

it("should check if no moves are correctly calculated", () => {
    const wrapper = mount(<Status maxMoves={9} movesCount={9} gameEnded={false} readablePlayer="X" />);
    expect(wrapper.text()).toBe("No more moves.");
});

it("checks if player X is the winner", () => {
    const wrapper = mount(<Status maxMoves={9} movesCount={9} gameEnded={true} readablePlayer="X" />);
    expect(wrapper.text()).toBe("Congratulations!!! X you are the winner!");
});

it("checks if player O is the winner", () => {
    const wrapper = mount(<Status maxMoves={9} movesCount={9} gameEnded={true} readablePlayer="O" />);
    expect(wrapper.text()).toBe("Congratulations!!! O you are the winner!");
});

it("checks if it's player X turn", () => {
    const wrapper = mount(<Status maxMoves={9} movesCount={8} gameEnded={false} readablePlayer="X" />);
    expect(wrapper.text()).toBe("X, it's your turn!");
});

it("checks if it's player O turn", () => {
    const wrapper = mount(<Status maxMoves={9} movesCount={8} gameEnded={false} readablePlayer="O" />);
    expect(wrapper.text()).toBe("O, it's your turn!");
});
