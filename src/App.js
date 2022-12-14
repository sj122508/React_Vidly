import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import Movies from "./components/movies";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";

class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}

	render() {
		const { user } = this.state;
		return (
			<React.Fragment>
				<ToastContainer />
				<NavBar user={user} />
				<main className="container">
					<Switch>
						<Route path={"/login"} component={LoginForm} />
						<Route path={"/logout"} component={Logout} />
						<Route path={"/register"} component={RegisterForm} />
						<ProtectedRoute path={"/movies/:id"} component={MovieForm} />
						<Route
							path="/movies"
							render={(props) => <Movies {...props} user={user} />}
						/>
						<Route path="/customers" component={Customers} />
						<Route path="/rentals" component={Rentals} />
						<Route path="/not-found" component={NotFound} />
						<Redirect from="/" exact to="/movies" />
						<Redirect to="not-found" />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;

// Switch - The switch will render the first child that matches the location
// Route - It will render declared UI component when its path matches the current URL
// Redirect - Redirect the user to another  or different url, can be use if URL not matched any of routes
