import React, { useState } from "react";

import Square from "components/game/Square";
import styles from "components/game/Board.module.scss";

// Renders the different squares per row
function Board() {
  const [valuesArr, setValuesArr] = useState(Array(9).fill(null)); // Values of the 1st-9th square
  const [nextPlayer, setNextPlayer] = useState("O"); // Initial player aka first player to go is O
  const winner = detectWinner(); // Checks if there is a winner every render

  // To detect winner
  function detectWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (valuesArr[a] && valuesArr[a] === valuesArr[b] && valuesArr[a] === valuesArr[c]) {
        return valuesArr[a];
      }
    }

    return null;
  }

  // To reset board
  function reset() {
    let valuesArrClone = valuesArr.slice(); // To create a copy of valuesArr that we can edit
    valuesArrClone = []; // To clear the copied array
    setValuesArr(valuesArrClone); // To update valuesArr and clear the values of the square
    setNextPlayer("O"); // To reset next player to "O"
  }

  // i parameter - index of the valuesArr we want to change aka the Nth square
  function updateValuesArr(i) {
    // If the Square we are trying to change already has a value - just return to not overwrite it
    if (detectWinner(valuesArr) || valuesArr[i]) {
      return;
    }

    const valuesArrClone = valuesArr.slice(); // Same as [...valuesArr] to make the state immutable
    valuesArrClone[i] = nextPlayer; // nextPlayer is the next move so we just update the index with that
    setValuesArr(valuesArrClone); // To update the valuesArr
    setNextPlayer(nextPlayer === "O" ? "X" : "O"); // To swap the next player to X or back to O
  }

  function renderSquare(i) {
    /**
     * i = index of the square
     * value = value of the square (taken from valuesArr using the index)
     * onClick = triggers updateValuesArr when we click on a square
     */
    return <Square i={i} value={valuesArr[i]} onClick={updateValuesArr} />;
  }

  return (
    <div className={styles.container}>
      <h1>Next player: {nextPlayer}</h1>
      <h2>Winner: {winner}</h2>
      <button className={styles.resetButton} onClick={reset}>Reset</button>
      <div>
        <div className={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div>
        <button>{`<`}</button>
        <button>{`>`}</button>
      </div>
    </div>
  );
}

export default Board;
