import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Box extends Component {
    render() {
        const { rowIdx, boxIdx, value } = this.props;
        const icon = value === -1 ? "X" : value === 1 ? "O" : "\u00A0";
        return <button onClick={this.props.onClick.bind(this, rowIdx, boxIdx)}>{icon}</button>;
    }
}

Box.propTypes = {
    rowIdx: PropTypes.number.isRequired,
    boxIdx: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};
