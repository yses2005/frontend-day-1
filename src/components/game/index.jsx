import React, { useState, useMemo } from "react";
import Board from "components/game/Board";

function checkDiagonally(valuesArr) {
	// slanted from left to right
	let first = valuesArr[0],
		second = valuesArr[4],
		third = valuesArr[8];
	if (first && second && third && first === second && second === third)
		return first;

	// slanted from right to left
	first = valuesArr[2];
	second = valuesArr[4];
	third = valuesArr[6];
	if (first && second && third && first === second && second === third)
		return first;
	return "";
}

// Renders the Board component
function Game() {
	const [valuesArr, setValuesArr] = useState(Array(9).fill(null)); // Values of the 1st-9th square
	const [nextPlayer, setNextPlayer] = useState("O"); // Initial player aka first player to go is O

	// i parameter - index of the valuesArr we want to change aka the Nth square
	function updateValuesArr(i) {
		// If the Square we are trying to change already has a value - just return to not overwrite it
		if (valuesArr[i]) {
			return;
		}

		// if has winner
		if (winner !== "") return;

		const valuesArrClone = valuesArr.slice(); // Same as [...valuesArr] to make the state immutable
		valuesArrClone[i] = nextPlayer; // nextPlayer is the next move so we just update the index with that
		setValuesArr(valuesArrClone); // To update the valuesArr
		setNextPlayer(nextPlayer === "O" ? "X" : "O"); // To swap the next player to X or back to O
	}
	// reset board
	function resetBoardHandler() {
		setValuesArr(Array(9).fill(null));
		setNextPlayer("O");
	}

	// useMemo to return a 'memoized' value or a computed value
	const winner = useMemo(() => {
		// O(3)
		for (let i = 0; i < 3; i++) {
			// check horizontally
			const baseIndex = i * 3;
			// const values = ;
			// grab the first, second, and third square
			// O(n)
			let [first, second, third] = valuesArr.slice(baseIndex, baseIndex + 3);
			console.log(
				`baseIndex: ${baseIndex}\nfirst: ${first}, second: ${second}, third: ${third}`
			);
			if (first && second && third && first === second && second === third)
				return first;

			// vertical checking
			first = valuesArr[i];
			second = valuesArr[i + 3];
			third = valuesArr[i + 6];
			if (first && second && third && first === second && second === third)
				return first;
		}

		// diagonal checking
		const result = checkDiagonally(valuesArr);
		return result;

		// return "";
	}, [valuesArr]);
	return (
		<Board
			valuesArr={valuesArr}
			updateValuesArr={updateValuesArr}
			resetBoardHandler={resetBoardHandler}
			winner={winner}
			nextPlayer={nextPlayer}
		/>
	);
}

export default Game;
