import React, { useState } from "react";

import Board from "components/game/Board";

// Renders the Board component
function Game() {
  const [valuesArr, setValuesArr] = useState(Array(9).fill(null)); // Values of the 1st-9th square
  const [nextPlayer, setNextPlayer] = useState("O"); // Initial player aka first player to go is O
  const winner = winnerChecker(valuesArr);

  // i parameter - index of the valuesArr we want to change aka the Nth square
  function updateValuesArr(i) {
    // If the Square we are trying to change already has a value - just return to not overwrite it
    if (valuesArr[i]) {
      return;
    }
    //if there already is a winner, you cannot change the values of the other squares
    if (winner != null) {
      return;
    }

    const valuesArrClone = valuesArr.slice(); // Same as [...valuesArr] to make the state immutable
    valuesArrClone[i] = nextPlayer; // nextPlayer is the next move so we just update the index with that
    setValuesArr(valuesArrClone); // To update the valuesArr
    setNextPlayer(nextPlayer === "O" ? "X" : "O"); // To swap the next player to X or back to O
  }

  // reset board (reset value of squares)
  function resetBoard() {
    setValuesArr(Array(9).fill(null)); 
    setNextPlayer("O");
  }

  function winnerChecker(valuesArr) {
    const win = [
      [0, 4, 8],  //diagonal
      [2, 4, 6],  //diagonal
      [0, 1, 2],  //horizontal 
      [3, 4, 5],  //horizontal 
      [6, 7, 8],  //horizontal 
      [0, 3, 6],  //vertical
      [1, 4, 7],  //vertical
      [2, 5, 8],  //vertical
    ]; 
    for (let index = 0; index < win.length; index++) {
      const [a, b, c] = win[index]; 
      // if the accessed squares (from the 'win' list) have the same value with each other, return the value of the square as the winner 
      if (valuesArr[a] && valuesArr[a] === valuesArr[b] && valuesArr[a] === valuesArr[c]) {
        return valuesArr[a]; 
      }
    }
    return null;
  }

  return (
    <Board
    valuesArr = { valuesArr }
    updateValuesArr = { updateValuesArr }
    reset = { resetBoard }
    winner = { winner }
    nextPlayer = { nextPlayer }
    />
  );
}

export default Game;