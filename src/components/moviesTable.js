import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
	columns = [
		{ path: "title", label: "Title" },
		{ path: "genre.name", label: "Genre" },
		{ path: "numberInStock", label: "Stock" },
		{ path: "dailyRentalRate", label: "Rate" },
		{
			key: "like",
			content: (movie) => (
				<Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
			),
		},
		{
			key: "delete",
			content: (movie) => (
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => this.props.onDelete(movie._id)}
				>
					Delete
				</button>
			),
		},
	];
	render() {
		const { movies, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				onSort={onSort}
				data={movies}
				sortColumn={sortColumn}
			/>
			// <table className="table table-strih5ed table-sm">
			// 	<TableHeader
			// 		columns={this.columns}
			// 		sortColumn={sortColumn}
			// 		onSort={onSort}
			// 	/>
			// 	<TableBody data={movies} columns={this.columns} />
			// </table>
		);
	}
}

export default MoviesTable;

// const MoviesTable = ({ movies, onDelete, onLike, onSort }) => {
// 	return (

// 	);
// };

// export default MoviesTable;
