import React from "react";

import { Form, FormControl, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";


import "../App.css";



function SearchForm(props) {
	return (
		<div className="searchFormDiv">
			<Form id="searchForm">
			

				<Row className="align-items-center" style={{ width: "45rem" }}>
					<Col>
						<Form.Label>Search</Form.Label>
					</Col>
					<Col md={5}>
						<FormControl
							type="text"
							placeholder="e.g. Tayla Swift"
							name="searchTerm"
							onChange={props.handleChangeSearchTerm}
						/>
					</Col>
					<Col>
						<Form.Label>Media:</Form.Label>
					</Col>
					<Col md={3}>
						<Form.Select
							aria-label="Select options"
							name="mediaType"
							onChange={props.handleChangeMediaType}>
							<option value="all">All types</option>
							<option value="movie">Movie</option>
							<option value="podcast">Podcast</option>
							<option value="music">Music</option>
							<option value="audiobook">Audiobook</option>
							<option value="short film">Short Film</option>
							<option value="tv show">TV Show</option>
							<option value="software">Software</option>
							<option value="ebook">eBook</option>
						</Form.Select>
					</Col>
					<Col>
						<Button variant="primary" type="button" onClick={props.handleSubmit}>
							Search
						</Button>
					</Col>
				</Row>
			</Form>

		
		</div>
	);
}


export default SearchForm;
