import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasWon: false,
			board: this.createBoard(),
		};
	}

	static defaultProps = {
		nrows: 5,
		ncols: 5,
		chanceLightStartsOn: 0.25,
	};

	createBoard() {
		let { nrows, ncols } = this.props;
		let board = Array(nrows)
			.fill(Array(ncols).fill(false))
			.map(subArr => {
				return subArr.map(_ => Math.random() < this.props.chanceLightStartsOn);
			});
		return board;
	}

	flipCellsAround(coord) {
		let { ncols, nrows } = this.props;
		let board = this.state.board;
		let [y, x] = coord.split("-").map(Number);

		function flipCell(y, x) {
			if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
				board[y][x] = !board[y][x];
			}
		}

		flipCell(y, x);
		flipCell(y - 1, x);
		flipCell(y + 1, x);
		flipCell(y, x - 1);
		flipCell(y, x + 1);

		let hasWon = board.every(row => row.every(cell => !cell));
		this.setState({ board: board, hasWon: hasWon });
	}

	createCells = () => {
		let tblBoard = this.state.board.map((subArr, y) => {
			return (
				<tr key={y}>
					{subArr.map((bool, x) => (
						<Cell
							key={`${y}-${x}`}
							flipCellsAroundMe={() => this.flipCellsAround(`${y}-${x}`)}
							isLit={bool}
						/>
					))}
				</tr>
			);
		});
		return tblBoard;
	};

	render() {
		return !this.state.hasWon ? (
			<div>
				<div className="container">
					<div className="neon-orange">Lights</div>
					<div className="neon-blue">Out</div>
				</div>
				<table className="Board">
					<tbody>{this.createCells()}</tbody>
				</table>
			</div>
		) : (
			<div className="winner">
				<span className="neon-orange">You</span>
				<span className="neon-blue">Won</span>
			</div>
		);
	}
}

export default Board;
