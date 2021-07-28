import React from "react";

import styles from "components/game/Square.module.scss";

// See renderSquare from Board.jsx
function Square({ i, value, onClick }) {
  function handleClick() {
    /**
     * Since updateValuesArr aka the onClick we passed from the parent Board.jsx needs an index,
     *  we pass the Square's current index so we know which value from the array to update.
     */

    onClick(i);

    /**
     * You can also make the JSX below like:
     * <div
     *  className={styles.square}
     *  onClick={() => {
     *    onClick(i);
     *  }}
     * >
     */
  }

  return (
    <div className={styles.square} onClick={handleClick}>
      <div className={value === "O" ? styles.o : styles.x}>{value}</div>
    </div>
  );
}

export default Square;
