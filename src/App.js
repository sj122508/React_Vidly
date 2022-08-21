import logo from "./logo.svg";
import "./App.css";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";

function App() {
	return (
		<>
			<NavBar />
			<main className="container">
				<Switch>
					<Route path={"/movies/:id"} component={MovieForm} />
					<Route path="/movies" component={Movies} />
					<Route path="/customers" component={Customers} />
					<Route path="/rentals" component={Rentals} />
					<Route path="/not-found" component={NotFound} />
					<Redirect from="/" exact to="/movies" />
					<Redirect to="not-found" />
				</Switch>
			</main>
		</>
	);
}

export default App;

// Switch - The switch will render the first child that matches the location
// Route - It will render declared UI component when its path matches the current URL
// Redirect - Redirect the user to another  or different url, can be use if URL not matched any of routes
