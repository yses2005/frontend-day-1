import React, {useState} from "react";
import Board from "components/game/Board";

// Renders the Board component
function Game() {
  const [valuesArr, setValuesArr] = useState(Array(9).fill(null)); // Values of the 1st-9th square
  const [nextPlayer, setNextPlayer] = useState("O"); // Initial player aka first player to go is O

  let winner = checkWinner(valuesArr);

  // i parameter - index of the valuesArr we want to change aka the Nth square
  function updateValuesArr(i) {
    // If the Square we are trying to change already has a value - just return to not overwrite it
    if (valuesArr[i] || winner != null) {
      return;
    }

    const valuesArrClone = valuesArr.slice(); // Same as [...valuesArr] to make the state immutable
    valuesArrClone[i] = nextPlayer; // nextPlayer is the next move so we just update the index with that

    setValuesArr(valuesArrClone); // To update the valuesArr

    winner = checkWinner(valuesArrClone);
    if (winner != null) {
      return setNextPlayer(null);
    }

    setNextPlayer(nextPlayer === "O" ? "X" : "O"); // To swap the next player to X or back to O
  }

  //funtion to check if there is already a winner
  function checkWinner(arr2) { 

    //check by row
    for (let i=0; i<7; i+=3) {
      if (arr2[i] === arr2[i+1] && arr2[i] === arr2[i+2])
        return arr2[i];
    }

    //check by column
    for (let i=0; i<3; i++) {
      if (arr2[i] === arr2[i+3] && arr2[i] === arr2[i+6])
        return arr2[i];
    }

    //check diagonally
    if (arr2[0] === arr2[4] && arr2[0] === arr2[8]) return arr2[0];
    if (arr2[2] === arr2[4] && arr2[2] === arr2[6]) return arr2[2];

    //chech if all the boxes are already filled up
    if (!arr2.includes(null)) return 'DRAW';

    return null;
  }

  //function to reset the board
  function reset() {
    setValuesArr(Array(9).fill(null));
    setNextPlayer("O");
  }

  return <Board 
    valuesArr = {valuesArr}
    nextPlayer = {nextPlayer}
    winner = {winner}
    updateValuesArr = {updateValuesArr}
    reset = {reset}
  />;
}

export default Game;
