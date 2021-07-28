import React from "react";

import styles from "components/game/Square.module.scss";

function Square({ index, value, onClick }) {
  return (
    <div
      className={styles.square}
      onClick={() => {
        onClick(index);
      }}
    >
      <div className={value === "O" ? styles.o : styles.x}>{value}</div>
    </div>
  );
}

export default Square;
