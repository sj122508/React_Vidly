import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import { toast, Toast } from "react-toastify";

import { getMovies, deleteMovie } from "../services/moviesService";
// import { getGenres } from "../services/fakeGenreService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";

import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		selectedGenre: null,
		sortColumn: { path: "title", order: "asc" },
		searchQuery: "",
	};

	async componentDidMount() {
		const { data } = await getGenres(); // wait for promise
		const genres = [{ _id: "", name: "All Genres" }, ...data];

		const { data: movies } = await getMovies();
		this.setState({ movies, genres });
	}

	handleDelete = async (movie) => {
		const originalMovies = this.state.movies;
		const movies = originalMovies.filter((m) => m._id !== movie._id);
		this.setState({
			movies,
		});

		try {
			await deleteMovie(movie._id);
		} catch (ex) {
			if (ex.response !== null && ex.response.status === 404) {
				toast.error("This movie has already been deleted.");
			}

			this.setState({ movies: originalMovies });
		}
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;

		this.setState({ movies });
	};

	handlePageChange = (page) => {
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

		const { user } = this.props;

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
						{user && (
							<Link to="/movies/new" className="btn btn-primary mb-3">
								New Movie
							</Link>
						)}
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
