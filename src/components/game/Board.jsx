import Square from "components/game/Square";
import styles from "components/game/Board.module.scss";

// Renders the different squares per row
function Board(props) {
  const { valuesArr, updateValuesArr, reset, winner, nextPlayer} = props;
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
      <h2>Winner: { winner }</h2>
      <button className={styles.resetButton} onClick = { reset }>Reset</button>
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
