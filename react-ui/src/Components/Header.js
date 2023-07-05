import React from "react";

import SearchForm from "./SearchForm";

import "../App.css";

function Header(props) {
	return (
		<header className="header">
			<h1>iTunes</h1>

			<SearchForm
				handleSubmit={props.handleSubmit}
				handleChangeSearchTerm={props.handleChangeSearchTerm}
				handleChangeMediaType={props.handleChangeMediaType}
			/>
		</header>
	);
}

export default Header;
