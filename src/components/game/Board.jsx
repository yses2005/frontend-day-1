import React, { useState } from "react";

import Square from "components/game/Square";
import styles from "components/game/Board.module.scss";

function Board() {
  const [board, setBoard] = useState(Array(9).fill(null)); // -> [null, null, null, null, null, null, null, null, null]
  const [nextValue, setNextValue] = useState("O");

  function onClickHandler(i) {
    if (board[i]) {
      return;
    }

    const newBoard = board.slice(); // [...board]
    newBoard[i] = nextValue;
    setBoard(newBoard);
    setNextValue(nextValue === "O" ? "X" : "O");
  }

  function renderSquare(i) {
    return <Square index={i} value={board[i]} onClick={onClickHandler} />;
  }

  return (
    <div className={styles.container}>
      <h1>Next player: {nextValue}</h1>
      <h2>Winner: </h2>
      <button className={styles.resetButton}>Reset</button>
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
