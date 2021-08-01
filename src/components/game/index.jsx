import React, { useState } from "react";
import Board from "components/game/Board";

// Renders the Board component
function Game() {
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

  return <Board valuesArr = {valuesArr} updateValuesArr = {updateValuesArr} nextPlayer = {nextPlayer} winner = {winner} reset = {reset} />;
}

export default Game;