import config from "../config.json";
import http from "./httpServices";

export function getGenres() {
	return http.get(config.apiUrl + "/genres");
}
