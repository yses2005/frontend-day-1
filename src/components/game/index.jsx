import React, { useState } from "react";
import Board from "components/game/Board";

// Calculates who won the game
function calculateWinner(board) {
  // All the winning combinations
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    // If the values of each index match, return the winner
    if (board[a] && board[a] === board[b] && board[a] === board[c]) { 
      return board[a];
    }
    // Else if there are no more null values in the board, return "Draw"
    else if (!board.includes(null)) {
      return "Draw";
    }
  }
  return null;
}

// Renders the Board component
function Game() {
  const [valuesArr, setValuesArr] = useState(Array(9).fill(null)); // Values of the 1st-9th square
  const [nextPlayer, setNextPlayer] = useState("O"); // Initial player aka first player to go is O
  const winner = calculateWinner(valuesArr);

  // i parameter - index of the valuesArr we want to change aka the Nth square
  function updateValuesArr(i) {

    // If the Square already has a value or if there is a winner - just return to not overwrite it
    if (winner || valuesArr[i]) {
      return;
    }

    const valuesArrClone = valuesArr.slice(); // Same as [...valuesArr] to make the state immutable
    valuesArrClone[i] = nextPlayer; // nextPlayer is the next move so we just update the index with that
    setValuesArr(valuesArrClone); // To update the valuesArr
    setNextPlayer(nextPlayer === "O" ? "X" : "O"); // To swap the next player to X or back to O
  }

  // Resets the values in the board
  function resetBoard() {
    setValuesArr(Array(9).fill(null));
    setNextPlayer("O");
  }

  return <Board 
            valuesArr = { valuesArr }
            updateValuesArr = { updateValuesArr }
            resetBoard = { resetBoard }
            nextPlayer = { nextPlayer }
            winner = { winner }
        />;
}

export default Game;
