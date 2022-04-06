import React from "react";
import UserService from "../services/user.service";
const { UserContent } = UserService;

const BoardUser = () => {
	return (
		<div className="container">
			<header className="jumbotron">
				<UserContent />
			</header>
		</div>
	);
}

export default BoardUser;
