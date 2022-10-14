import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
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

						{!user && (
							<React.Fragment>
								<NavLink className="nav-item nav-link" to="/login">
									Login
								</NavLink>

								<NavLink className="nav-item nav-link" to="/register">
									Register
								</NavLink>
							</React.Fragment>
						)}

						{user && (
							<React.Fragment>
								<NavLink className="nav-item nav-link" to="/profile">
									{user.name}
								</NavLink>

								<NavLink className="nav-item nav-link" to="/logout">
									Logout
								</NavLink>
							</React.Fragment>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
