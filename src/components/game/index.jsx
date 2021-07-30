import React, { useState } from "react";
import Board from "components/game/Board";

// Renders the Board component
function Game() {
  const [valuesArr, setValuesArr] = useState(Array(9).fill(null)); // Values of the 1st-9th square
  const [nextPlayer, setNextPlayer] = useState("O"); // Initial player aka first player to go is O
  const [winner, setWinner] = useState(""); // Winner is initially blank

  // i parameter - index of the valuesArr we want to change aka the Nth square
  function updateValuesArr(i) {
    // If the Square we are trying to change already has a value - just return to not overwrite it
    if (valuesArr[i]) {
      return;
    }

    // If the game is over, return so that the squares can't be clicked anymore
    if (winner) {
      return;
    }

    const valuesArrClone = valuesArr.slice(); // Same as [...valuesArr] to make the state immutable
    valuesArrClone[i] = nextPlayer; // nextPlayer is the next move so we just update the index with that
    setValuesArr(valuesArrClone); // To update the valuesArr
    setNextPlayer(nextPlayer === "O" ? "X" : "O"); // To swap the next player to X or back to O
  }

  function checkWinner() {
    const lines = [
      // Horizontal lines
      [valuesArr[0], valuesArr[1], valuesArr[2]],
      [valuesArr[3], valuesArr[4], valuesArr[5]],
      [valuesArr[6], valuesArr[7], valuesArr[8]],
      // Vertical lines
      [valuesArr[0], valuesArr[3], valuesArr[6]],
      [valuesArr[1], valuesArr[4], valuesArr[7]],
      [valuesArr[2], valuesArr[5], valuesArr[8]],
      // Diagonals
      [valuesArr[0], valuesArr[4], valuesArr[8]],
      [valuesArr[2], valuesArr[4], valuesArr[6]]
    ]
    
    // Check squares for possible wins
    for (let line of lines) {
      const [a,b,c] = line;
      if (a&&a===b&&b===c&&c) {
        setWinner(a);
        break;
      }
    }

    // If squares are filled but there are no winners, return DRAW
    if (!valuesArr.includes(null) && winner==="") {
      setWinner("DRAW");
    }

    return winner;
  }
  function resetGame() {
    /**
     * - Clear the value of all squares
     * - Reset next player to "O"
     * - Clear the winner
     */
    setValuesArr(valuesArr.fill(null));
    setNextPlayer("O");
    setWinner("");
  }

  return <Board valuesArr={valuesArr}
                updateValuesArr={updateValuesArr}
                nextPlayer={nextPlayer}
                checkWinner={checkWinner}
                resetGame={resetGame} />;
}

export default Game;
