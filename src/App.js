import React, { Component } from "react";
import Box from "./components/Box";
import Status from "./components/Status";

const getInitialState = () => ({
    gameStatus: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    gameEnded: false,
    currentPlayer: -1,
    movesCount: 0
});

class App extends Component {
    state = getInitialState();

    /**
     * Function called when clicking on a cell box.
     * @param {number} rowIdx - The row index of the cell selected
     * @param {number} boxIdx - The box index of the cell selected
     */
    handleClick = (rowIdx, boxIdx) => {
        const { gameStatus, gameEnded, currentPlayer, movesCount } = this.state;

        //if box already set or game has ended, don't allow changes
        if (gameStatus[rowIdx][boxIdx] !== 0 || gameEnded) return;

        let arr = gameStatus.slice(0);
        arr[rowIdx][boxIdx] = currentPlayer;

        const won = this.checkWinner(arr);
        if (won) {
            this.setState({
                gameEnded: true
            });
        } else {
            this.setState({
                currentPlayer: currentPlayer * -1,
                gameStatus: arr,
                movesCount: movesCount + 1
            });
        }
    };

    /**
     * Check if the given number is -3 or 3.
     * @param {number} num - The number that needs to be checked
     */
    isMagicNumber = num => {
        return Math.abs(num) === 3;
    };

    /**
     * Function called to check if the 2d array is the winning combination
     * @param {Array} arr - The combination array
     */
    checkWinner = arr => {
        return (
            this.isMagicNumber(arr[0][0] + arr[0][1] + arr[0][2]) ||
            this.isMagicNumber(arr[1][0] + arr[1][1] + arr[1][2]) ||
            this.isMagicNumber(arr[2][0] + arr[2][1] + arr[2][2]) ||
            this.isMagicNumber(arr[0][0] + arr[1][0] + arr[2][0]) ||
            this.isMagicNumber(arr[0][1] + arr[1][1] + arr[2][1]) ||
            this.isMagicNumber(arr[0][2] + arr[1][2] + arr[2][2]) ||
            this.isMagicNumber(arr[0][0] + arr[1][1] + arr[2][2]) ||
            this.isMagicNumber(arr[0][2] + arr[1][1] + arr[2][0])
        );
    };

    /**
     * Function to reset the game status
     */
    newGame = () => {
        const obj = getInitialState();
        this.setState(obj);
    };

    /**
     * The game render function
     */
    render() {
        const { gameStatus, currentPlayer, gameEnded, movesCount } = this.state;
        const readablePlayer = currentPlayer === -1 ? "X" : "O";
        return (
            <div className="game">
                <h1 className="title">TIC TAC TOE</h1>
                <main>
                    <div id="board">
                        {gameStatus.map((row, rowIdx) => (
                            <div key={rowIdx}>
                                {row.map((value, boxIdx) => (
                                    <Box
                                        key={boxIdx}
                                        rowIdx={rowIdx}
                                        boxIdx={boxIdx}
                                        value={value}
                                        onClick={this.handleClick}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div id="status">
                        <button className="btn" onClick={this.newGame}>
                            New Game
                        </button>
                        <Status movesCount={movesCount} gameEnded={gameEnded} readablePlayer={readablePlayer} />
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
