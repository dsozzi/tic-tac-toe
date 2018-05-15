import React from "react";
import PropTypes from "prop-types";

const Message = props => <p>{props.message}</p>;
export default Message;

Message.propTypes = {
    message: PropTypes.string
};
