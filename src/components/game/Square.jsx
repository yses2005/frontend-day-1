import React from "react";

import styles from "components/game/Square.module.scss";

function Square() {
  return (
    <div className={styles.square}>
      <div className={styles.o}></div>
    </div>
  );
}

export default Square;
