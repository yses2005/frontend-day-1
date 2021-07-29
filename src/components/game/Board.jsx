import React, { useState, useMemo } from "react";

import Square from "components/game/Square";
import styles from "components/game/Board.module.scss";

// Renders the different squares per row
function Board() {
	const [valuesArr, setValuesArr] = useState(Array(9).fill(null)); // Values of the 1st-9th square
	const [nextPlayer, setNextPlayer] = useState("O"); // Initial player aka first player to go is O

	// i parameter - index of the valuesArr we want to change aka the Nth square
	function updateValuesArr(i) {
		// If the Square we are trying to change already has a value - just return to not overwrite it
		if (valuesArr[i]) {
			return;
		}

		const valuesArrClone = valuesArr.slice(); // Same as [...valuesArr] to make the state immutable
		valuesArrClone[i] = nextPlayer; // nextPlayer is the next move so we just update the index with that
		setValuesArr(valuesArrClone); // To update the valuesArr
		setNextPlayer(nextPlayer === "O" ? "X" : "O"); // To swap the next player to X or back to O
	}

	function renderSquare(i) {
		/**
		 * i = index of the square
		 * value = value of the square (taken from valuesArr using the index)
		 * onClick = triggers updateValuesArr when we click on a square
		 */
		return <Square i={i} value={valuesArr[i]} onClick={updateValuesArr} />;
	}

	// reset board
	function resetBoardHandler() {
		setValuesArr(Array(9).fill(null));
		setNextPlayer("O");
	}

	// useMemo to return a 'memoized' value or a computed value
	const winner = useMemo(() => {
		for (let i = 0; i < 3; i++) {
			// check horizontally
			const baseIndex = i * 3;
			// const values = ;
			// grab the first, second, and third square
			const [first, second, third] = valuesArr.slice(baseIndex, baseIndex + 3);
			console.log(
				`baseIndex: ${baseIndex}\nfirst: ${first}, second: ${second}, third: ${third}`
			);
			if (first && second && third && first === second && second === third)
				return first;
		}
		return "Winner winner chicken dinner";
	}, [valuesArr]);

	return (
		<div className={styles.container}>
			<h1>Next player: {nextPlayer}</h1>
			<h2>Winner: {winner}</h2>
			<button className={styles.resetButton} onClick={resetBoardHandler}>
				Reset
			</button>
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
