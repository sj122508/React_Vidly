import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/userService";
import auth from "../services/authService"

class RegisterForm extends Form {
	state = {
		data: { username: "", password: "", name: "" },
		errors: {},
	};

	schema = {
		username: Joi.string().email().required().label("Username"),
		password: Joi.string().min(5).required().label("Passowrd"),
		name: Joi.string().required().label("Name"),
	};

	doSubmit = async () => {
		//Call server
		try {
			const response = await register(this.state.data);
			auth.loginWithJwt(response.headers["x-auth-token"]);
			// this.props.history.push("/");
			window.location = "/"; // Full reload the page
		} catch (error) {
			if (error.response && error.response.status == "400") {
				const errors = { ...this.state.errors };
				errors.username = error.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		return (
			<div>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username", "email")}
					{this.renderInput("password", "Password")}
					{this.renderInput("name", "Name")}
					{this.rederSubmit("Register")}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
