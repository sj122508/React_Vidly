import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

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

	doSubmit = () => {
		//Call server
		console.log("Submitted");
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