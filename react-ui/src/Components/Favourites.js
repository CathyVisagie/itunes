import React from "react";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom stylesheet
import "../App.css";

// Create function to display favourites stored in state array
function Favourites(props) {
	//Declare variables
	let initialArray = [];
	let array = [];

	// Only create divs/lists to display favourites if there actually are favourites in array
	if (props.newFavourite.length !== 0) {
		initialArray = props.newFavourite;

		for (let i = 0; i <= initialArray.length - 1; i++) {
			array.push(
				<div className="faveDiv" key={i}>
					<div className="deleteButtonDiv">
						<button type="button" variant="primary" onClick={() => props.deleteFavourite(i)}>
							Delete
						</button>
					</div>
					<ul key={i}>
						<li>Track Name: {initialArray[i].track}</li>
						<li>Artist Name: {initialArray[i].artist}</li>
						<li>Collection: {initialArray[i].collection}</li>
						<li>Media Type: {initialArray[i].kindOfMedia}</li>
					</ul>

					<div className="faveNum">{i + 1}</div>
				</div>
			);

		}

	} else {
		array = <p>Favourites list is empty</p>;
	}

	return (
		<div className="favourites">
			<div className="faveTitle">
				<h2>Favourites</h2>
			</div>

			{array}
		</div>
	);
}

export default Favourites;
