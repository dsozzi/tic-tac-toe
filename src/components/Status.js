import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Message extends Component {
    render() {
        const { movesCount, gameEnded, readablePlayer } = this.props;
        return (
            <React.Fragment>
                {gameEnded && <p> {`Congratulations!!! ${readablePlayer} you are the winner!`} </p>}
                {movesCount === 9 && !gameEnded && <p>No more moves.</p>}
                {movesCount < 9 && !gameEnded && <p>{`${readablePlayer}, it's your turn!`}</p>}
            </React.Fragment>
        );
    }
}
Message.propTypes = {
    movesCount: PropTypes.number.isRequired,
    gameEnded: PropTypes.bool.isRequired,
    readablePlayer: PropTypes.string.isRequired
};
