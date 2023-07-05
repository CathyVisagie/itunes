import React from "react";

import Favourites from "./Components/Favourites";
import DisplayResults from "./Components/DisplayResults";
import Header from "./Components/Header";
import GetSafe from "./Components/GetSafe";

import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";


import "./App.css";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: null,
			isLoaded: false,
			formSubmitted: false,
			items: {},

			resultsArray: [],
			resultsLoaded: false,

			searchTerm: "Lady Gaga",
			mediaType: "all",
			newUrl: null,

			favourite: [],
		};

		this.componentDidMount = this.componentDidMount.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeSearchTerm = this.handleChangeSearchTerm.bind(this);
		this.handleChangeMediaType = this.handleChangeMediaType.bind(this);

		this.sortData = this.sortData.bind(this);
		this.fetchAgain = this.fetchAgain.bind(this);
		this.handleFavourite = this.handleFavourite.bind(this);
		this.deleteFavourite = this.deleteFavourite.bind(this);
	}

	handleFavourite(track, artist, collection, kindOfMedia) {
		let fave = {
			track: track,
			artist: artist,
			collection: collection,
			kindOfMedia: kindOfMedia,
		};


		this.state.favourite.push(fave);
		this.setState(
			{
				favourite: this.state.favourite,
			},
			console.log("New favourite added. ")
		);
	}

	handleSubmit(event) {
		let searchTerm = this.state.searchTerm;
		let mediaType = this.state.mediaType;

		let editedSearchTerm = searchTerm.replace(" ", "+");

		let url = `https://itunes.apple.com/search?term=${editedSearchTerm}&media=${mediaType}&limit=5`;

		this.setState(
			{
				newUrl: url,
				resultsLoaded: false,
			},
			() => {
				console.log("New url saved to state: " + this.state.newUrl);
				this.fetchAgain();
			}
		);
	}

	handleChangeSearchTerm(event) {
		this.setState(
			{
				searchTerm: event.target.value,
			},
			() => console.log("Search term is: " + this.state.searchTerm)
		);
	}

	handleChangeMediaType(event) {
		this.setState(
			{
				mediaType: event.target.value,
			},
			() => console.log("Media type is: " + this.state.mediaType)
		);
	}

	deleteFavourite(index) {
		let faves = this.state.favourite;

		faves.splice(index, 1);

		this.setState({ favourite: faves }, console.log("Favourite has been deleted from state."));
	}

	sortData() {
		let results = [];
		let array = [];
		let initialArray = [];

		if (this.state.resultsLoaded === false) {
			initialArray = Object.entries(this.state.items);

			array = initialArray[1][1];

			if (array.length === 0) {
				return <p>No results. Try another search.</p>;
			}

			for (let i = 0; i <= array.length - 1; i++) {
        
        

				let imgSource = "";
				let track = "";
				let artist = "";
				let collection = "";
				let kindOfMedia = "";


				if (<GetSafe request={() => array[i].artworkUrl100} /> === undefined) {
				} else {
					imgSource = array[i].artworkUrl100;
				}

				if (<GetSafe request={() => array[i].trackName} /> === undefined) {
					track = "No track name given";
				} else {
					track = array[i].trackName;
				}

				if (<GetSafe request={() => array[i].artistName} /> === undefined) {
					artist = "No artist name given";
				} else {
					artist = array[i].artistName;
				}

				if (<GetSafe request={() => array[i].collectionName} /> === undefined) {
					collection = "No collection name given";
				} else {
					collection = array[i].collectionName;
				}

				if (<GetSafe request={() => array[i].kind} /> === undefined) {
					kindOfMedia = "No collection name given";
				} else {
					kindOfMedia = array[i].kind;
				}


				results.push(
					<div className="resultsListItem" key={i}>
						<img src={imgSource} alt="artist artwork" className="artworkImg" />

						<div className="ulListDiv">
							<ul>
								<li>
									{" "}
									<b>Track Name:</b> {track}{" "}
								</li>
								<li>
									{" "}
									<b>Artist Name:</b> {artist}{" "}
								</li>
								<li>
									{" "}
									<b>Collection Name:</b> {collection}{" "}
								</li>
								<li>
									{" "}
									<b>Kind of Media:</b> {kindOfMedia}{" "}
								</li>
							</ul>
						</div>

						<Button
							variant="primary"
							type="button"
							onClick={() => this.handleFavourite(track, artist, collection, kindOfMedia)}>
							Add Favourite
						</Button>
					</div>
				);

			}

			this.setState({ resultsArray: results, resultsLoaded: true }, () =>
				console.log("Sortdata function has run. Results Array saved in state.")
			);

		
		}

		
	}

	
	fetchAgain() {
		console.log("Fetch again has run.");

		let newUrl = this.state.newUrl;

		fetch("/changemedia", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				url: newUrl,
			}),
		})
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState(
						{
							resultsLoaded: false,
							isLoaded: true,
							items: result.message,
						},
						() => {
							console.log("Media was fetched and written to state.");


							this.sortData();
						}
					);
				},
				(error) => {
					this.setState(
						{
							resultsLoaded: false,
							isLoaded: true,
							error,
						},
						() => console.log("Media fetch failed with the error: " + error)
					);
				}
			);


	}

	componentDidMount() {
		if (this.state.isLoaded === false) {
			console.log("First fetch has run.");

			fetch("/getmedia")
				.then((res) => res.json())
				.then(
					(result) => {
						this.setState(
							{
								isLoaded: true,
								items: result.message,
							},
							() => {
								console.log("Media was fetched and written to state.");


								this.sortData();
							}
						);
					},
					(error) => {
						this.setState({
							isLoaded: true,
							error,
						});
					}
				);

		}

	}

	render() {
		const { error, isLoaded, searchTerm, mediaType, resultsArray, favourite } = this.state;

		if (error) {
			return <div> Error: {error.message} </div>;

		} else if (!isLoaded) {
			return <div> Loading... </div>;
		} else {
			return (
				<div className="app">

					<Header
						handleSubmit={this.handleSubmit}
						handleChangeSearchTerm={this.handleChangeSearchTerm}
						handleChangeMediaType={this.handleChangeMediaType}
					/>

					<div className="mainPage">
						<DisplayResults
							searchTerm={searchTerm}
							mediaType={mediaType}
							resultsArray={resultsArray}
						/>

						<Favourites newFavourite={favourite} deleteFavourite={this.deleteFavourite} />

					</div>

				</div>
			);

	
		}

	}


}


export default App;
