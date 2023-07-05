module.exports = function (app) {
  // Import fetch module
  const fetch = require("node-fetch");

  // HTTP GET route handler - just fetches some results for the user to look at (default)
  app.get("/getmedia", (req, res) => {
    // Create default url so user has some results to look at when they first arrive
    let url = "https://itunes.apple.com/search?term=jack+johnson&limit=10";

    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          //console.log("Result from api says: " + result);
          res.json({ message: result });
        },
        (error) => {
          console.log("Get request failed. Error is: " + error);
        }
      );

    // End of GET route handler
  });
};
