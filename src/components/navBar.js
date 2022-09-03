import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-light mb-3">
			<div className="container-fluid">
				<Link className="navbar-brand m-2" to="/">
					Vidly
				</Link>
				<div className="navbar-collapse">
					<div className="navbar-nav">
						<NavLink className="nav-item nav-link" to="/movies">
							Movies
						</NavLink>

						<NavLink className="nav-item nav-link" to="/customers">
							Customers
						</NavLink>

						<NavLink className="nav-item nav-link" to="/rentals">
							Rentals
						</NavLink>

						<NavLink className="nav-item nav-link" to="/login">
							Login
						</NavLink>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
