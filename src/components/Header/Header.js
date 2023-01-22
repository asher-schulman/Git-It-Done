import React, { useState } from "react";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import "./Header.css";
import { GiSlicedBread } from "react-icons/gi";

const Header = () => {
	const clientId =
		"315174623675-ctnted0vkh8b8saclg76rfcvg47vbkgh.apps.googleusercontent.com";

	const [user, setUser] = useState(
		localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""
	);

	return (
		<div className="header">
			<div className="title">
				<GiSlicedBread />
				Git It Done
			</div>
			<div className="icons">
				<Logout user={user} setUser={setUser} clientId={clientId} />
				<Login user={user} setUser={setUser} clientId={clientId} />
			</div>
		</div>
	);
};

export default Header;
