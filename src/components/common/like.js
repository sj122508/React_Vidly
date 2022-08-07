import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const Like = ({ liked, onClick }) => {
	return (
		<FontAwesomeIcon
			className="cursor-pointer"
			icon={liked ? faThumbsUp : faThumbsDown}
			onClick={onClick}
		/>
	);
};

export default Like;
