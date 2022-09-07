import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";

import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";

class Movies extends Component {
	state = {
		movies: getMovies(),
		genres: [],
		pageSize: 4,
		currentPage: 1,
		selectedGenre: null,
		sortColumn: { path: "title", order: "asc" },
		searchQuery: "",
	};

	componentDidMount() {
		const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

		this.setState({ movies: getMovies(), genres });
	}

	handleDelete = (movieId) => {
		const movies = this.state.movies.filter((movie) => movie._id !== movieId);
		this.setState({
			movies,
		});
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;

		this.setState({ movies });
	};

	handlePageChange = (page) => {
		console.log(page, "pagepagepagepagepage");
		this.setState({ currentPage: page });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	handleSearch = (query) => {
		this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
	};

	getPageData = () => {
		const {
			movies: allMovies,
			pageSize,
			currentPage,
			selectedGenre,
			searchQuery,
			sortColumn,
		} = this.state;

		let filtered = allMovies;

		if (searchQuery)
			filtered = allMovies.filter((m) =>
				m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		else if (selectedGenre && selectedGenre._id)
			filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	};

	render() {
		const {
			movies: allMovies,
			pageSize,
			currentPage,
			genres,
			sortColumn,
			selectedGenre,
			searchQuery,
		} = this.state;

		const { length: count } = allMovies;

		if (count === 0) return <p>There are no movies in the database.</p>;

		const { totalCount, data: movies } = this.getPageData();
		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						items={genres}
						selectedItem={selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>

				<div className="col">
					<div className="table-responsive">
						<Link to="/movies/new" className="btn btn-primary mb-3">
							New Movie
						</Link>
						<p>Showing {totalCount} movies in the database.</p>
						<SearchBox value={searchQuery} onChange={this.handleSearch} />
						<MoviesTable
							sortColumn={sortColumn}
							movies={movies}
							onDelete={this.handleDelete}
							onLike={this.handleLike}
							onSort={this.handleSort}
						/>
						<Pagination
							itemsCount={totalCount}
							pageSize={pageSize}
							currentPage={currentPage}
							onPageChange={this.handlePageChange}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Movies;
