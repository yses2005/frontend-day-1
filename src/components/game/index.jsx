import React, { useState } from "react";
import Board from "components/game/Board";

function Game() {
  
  const [board, setBoard] = useState(Array(9).fill(null)); // -> [null, null, null, null, null, null, null, null, null]
  const [nextValue, setNextValue] = useState("O");
  const [winner, setWinner] = useState(null);
  var [count, setCount] = useState(0);  //counter for how many times a square is clicked
  
  function onClickHandler(i) {
    if (winner){  //if there is a winner, do nothing
      return;
    }
    
    if (board[i]) {
      return;
    }
    
    const newBoard = board.slice(); // [...board]
    newBoard[i] = nextValue;
    setBoard(newBoard);
    setNextValue(nextValue === "O" ? "X" : "O");
    setCount(count=count+1) //increases the number of times the squares are clicked
  }
  
  function checkWinner() {
    
    //win by row
    if(board[0] === "X" && board[1] === "X" && board[2] === "X") setWinner("X");
    else if(board[3] === "X" && board[4] === "X" && board[5] === "X") setWinner("X");
    else if(board[6] === "X" && board[7] === "X" && board[8] === "X") setWinner("X");
    else if(board[0] === "O" && board[1] === "O" && board[2] === "O") setWinner("O");
    else if(board[3] === "O" && board[4] === "O" && board[5] === "O") setWinner("O");
    else if(board[6] === "O" && board[7] === "O" && board[8] === "O") setWinner("O");
    
    //win by column
    else if(board[0] === "X" && board[3] === "X" && board[6] === "X") setWinner("X");
    else if(board[1] === "X" && board[4] === "X" && board[7] === "X") setWinner("X");
    else if(board[2] === "X" && board[5] === "X" && board[8] === "X") setWinner("X");
    else if(board[0] === "O" && board[3] === "O" && board[6] === "O") setWinner("O");
    else if(board[1] === "O" && board[4] === "O" && board[7] === "O") setWinner("O");
    else if(board[2] === "O" && board[5] === "O" && board[8] === "O") setWinner("O");
    
    //win by diagonal
    else if(board[0] === "X" && board[4] === "X" && board[8] === "X") setWinner("X");
    else if(board[6] === "X" && board[4] === "X" && board[2] === "X") setWinner("X");
    else if(board[0] === "O" && board[4] === "O" && board[8] === "O") setWinner("O");
    else if(board[6] === "O" && board[4] === "O" && board[2] === "O") setWinner("O");
    
    //no winner
    else if(count===9){
      setWinner("N");
    }
  }
  
  function clickReset() {
    //reset the states
    setBoard(Array(9).fill(null));
    setNextValue("O");
    setWinner(null);
    setCount(0);
  }
  
  return <Board board={board} nextValue={nextValue} winner={winner} onClickHandler={onClickHandler} clickReset={clickReset} checkWinner={checkWinner}/>;
}

export default Game;
