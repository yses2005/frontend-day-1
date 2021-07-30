import React, { useState } from "react";
import Board from "components/game/Board";

// Renders the Board component
function Game() {
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

      // Gets the number of Os/Xs in its horizontal, vertical, and diagonal region. Increments to include the current element.
      const hRegion = [row, row + 1, row + 2].filter(i => valuesArr[i] === player).length + 1;
      const vRegion = [col, col + 3, col + 3 * 2].filter(i => valuesArr[i] === player).length + 1;
      const dRegion = getDiagonal(index)? getDiagonal(index).filter(i => valuesArr[i] === player).length + 1 : 1;

      if (hRegion === 3 || vRegion === 3 || dRegion === 3) setWinner(player); // Set the winner if one of the conditions satisfy.
      console.log(`Horizontal: ${hRegion}, Vertical: ${vRegion}, Diagonal: ${dRegion}`); // Debug
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

  // Gets the diagonal of an element.
  function getDiagonal(index) {
    const diagonal = [ [0, 4, 8], [2, 4, 6] ];
    for (let i = 0; i < diagonal.length; i++) {
      if (diagonal[i].includes(index)) return diagonal[i];
    } return null;
  }

  // Resets the game.
  function reset() {
    setWinner(null); // Resets the winner.
    setNextPlayer("O"); // Resets the player.
    setValuesArr(Array(9).fill(null)); // Resets the board.
  }

  return <Board
    nextPlayer={nextPlayer}
    valuesArr={valuesArr}
    winner={winner}
    updateValuesArr={updateValuesArr}
    detectWin={detectWin}
    reset={reset} />;
}

export default Game;
