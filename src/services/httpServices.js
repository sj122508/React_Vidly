import axios from "axios";
import { toast } from "react-toastify";
// import auth from "./authService";

axios.interceptors.response.use(null, (error) => {
	const expecteedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (!expecteedError) {
		toast.error("An unexpected error occurred.");
	}
	return Promise.reject(error);
});

function setJwt(jwt) {
	axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	setJwt,
};
