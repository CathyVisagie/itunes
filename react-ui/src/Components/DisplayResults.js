import React from "react";

// Import custom stylesheet
import "../App.css";

// Function to display search results on page
function DisplayResults(props) {
  return (
    <div className="output">
      <h2>Search Results</h2>
      <p>
        Search term: <b>{props.searchTerm}</b>, Media type:{" "}
        <b>{props.mediaType}</b>
      </p>
      {props.resultsArray}
    </div>
  );
}

// Export component to be used by other files
export default DisplayResults;
