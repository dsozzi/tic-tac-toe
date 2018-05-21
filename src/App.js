import React, { Component } from "react";
import Box from "./components/Box";
import Status from "./components/Status";

const MATRIX_SIZE = 3;

const getInitialState = n => ({
    gameStatus: (function() {
        // NOT GOOD --> new Array(n).fill(new Array(n).fill(0));
        var a = [];
        for (var i = 0; i < MATRIX_SIZE; i++) {
            a.push(new Array(MATRIX_SIZE).fill(0));
        }
        return a;
    })(),
    gameEnded: false,
    currentPlayer: -1,
    movesCount: 0
});

class App extends Component {
    state = getInitialState(MATRIX_SIZE);

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
     * Check if the given number is the matrix size.
     * @param {number} num - The number that needs to be checked
     */
    isMagicNumber = num => {
        return Math.abs(num) === MATRIX_SIZE;
    };

    /**
     * Function called to check if the 2d array is the winning combination
     * @param {Array} arr - The combination array
     */
    checkWinner = arr => {
        const self = this;
        let winning = false;

        if (this.movesCount < MATRIX_SIZE) return false;

        const sumArr = arr => arr.reduce((acc, cur) => acc + cur, 0);

        //check rows
        arr.forEach(function(row, i) {
            if (self.isMagicNumber(sumArr(row))) {
                winning = true;
            }
        });

        // not good looking but I can skip few iterations if a winning solution is in a row
        if (!winning) {
            checkColumns();
        }
        if (!winning) {
            checkDiagonals();
        }

        //check columns
        function checkColumns() {
            let columnsResults = new Array(MATRIX_SIZE).fill(0);
            arr.forEach(function(row, idx) {
                row.forEach(function(num, boxIdx) {
                    columnsResults[boxIdx] += num;
                });
            });

            //use for cycle to allow exit during loop
            for (let i = 0; i < columnsResults.length; i++) {
                let res = columnsResults[i];
                if (self.isMagicNumber(res)) {
                    winning = true;
                    return;
                }
            }
        }

        function checkDiagonals() {
            let diagonalLeft = 0;
            let diagonalRight = 0;
            arr.forEach(function(row, idx) {
                diagonalLeft += row[idx];
                diagonalRight += row[MATRIX_SIZE - idx - 1];
            });

            if (self.isMagicNumber(diagonalLeft) || self.isMagicNumber(diagonalRight)) {
                winning = true;
            }
        }

        return winning;
    };

    /**
     * Function to reset the game status
     */
    newGame = () => {
        const obj = getInitialState(MATRIX_SIZE);
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
                        <Status
                            maxMoves={MATRIX_SIZE * MATRIX_SIZE}
                            movesCount={movesCount}
                            gameEnded={gameEnded}
                            readablePlayer={readablePlayer}
                        />
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
