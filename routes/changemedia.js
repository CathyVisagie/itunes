module.exports = function (app) {
  // Import fetch module
  const fetch = require("node-fetch");

  /* HTTP POST route handler - Called when user does a search and we fetch new results from the API. Receives new search url in body of request */
  app.post("/changemedia", (req, res) => {
    let url = req.body.url;

    console.log("New url on backend is: " + url);

    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          res.json({ message: result });
        },
        (error) => {
          console.log("Media fetch failed. Error is: " + error);
        }
      );

    // End of HTTP POST route handler
  });
};
