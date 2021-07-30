import React, { useState } from "react";

import Square from "components/game/Square";
import styles from "components/game/Board.module.scss";

// Renders the different squares per row
function Board() {
  const [valuesArr, setValuesArr] = useState(Array(9).fill(null)); // Values of the 1st-9th square
  const [nextPlayer, setNextPlayer] = useState("O"); // Initial player aka first player to go is O
  const [winner, setWinner] = useState(null); // Winner of the game

  // i parameter - index of the valuesArr we want to change aka the Nth square
  function updateValuesArr(i) {
    // If the Square we are trying to change already has a value/winner is set - just return to not overwrite it.
    if (valuesArr[i]) {
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
    return <Square i={i} value={valuesArr[i]} onClick={() => {
      if (winner === null) { // If there's no winner yet, execute the functions.
        updateValuesArr(i);
        detectWin(nextPlayer, i);
      }
    }} />;
  }

  /**
   * == Additional Functions ==
   * Below are some functions needed for
   * the assignment.
   * 
   * @author Bianca Arce
   * @created_date 2021-07-29 20:50
   */

  // Detects the winner of the game.
  function detectWin(player, index) {
    const count = (valuesArr.filter(e => e === player).length) + 1; // Gets the element's count in the board.
    if (count >= 3) { // If there are 3 elements, check if it wins the game.
      // Gets the player's row and column indices.
      const row = getRowIndex(index), col = getColIndex(index);

      // Gets the horizontal, vertical, and diagonal region of current element. Increments to include the element.
      const hRegion = ([valuesArr[row], valuesArr[row + 1], valuesArr[row + 2]].filter(e => e === player).length) + 1;
      const vRegion = ([valuesArr[col], valuesArr[col + 3], valuesArr[col + 3 * 2]].filter(e => e === player).length) + 1;

      // Diagonal
      const diagonal = [
        [0, 4, 8],
        [2, 4, 6]
      ];
    }
  }

  // Gets the starting index of an element's row.
  function getRowIndex(index) {
    for (let i = 3; i <= valuesArr.length; i += 3) {
      if (index >= (i - 3) && index <= (i - 1)) return i - 3;
    }
  }

  // Gets the starting index of an element's column.
  function getColIndex(index) {
    for (let i = 0; i < 3; i++) {
      if (index === i || index === (i + 3) || index === (i + 3 * 2)) return i;
    }
  }

  // Resets the game.
  function reset() {
    setWinner(null); // Resets the winner.
    setNextPlayer("O"); // Resets the player.
    setValuesArr(Array(9).fill(null)); // Resets the board.
  }

  return (
    <div className={styles.container}>
      <h1>Next player: {nextPlayer}</h1>
      <h2>Winner: {winner? winner : "None"}</h2>
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
