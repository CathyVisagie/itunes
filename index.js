const express = require("express");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

/* Require Body Parser middleware so Express server can access content that is passed in the body of the HTTP
request */
const bodyParser = require("body-parser");

// Import and run helmet for security
const helmet = require("helmet");

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
	console.error(`Node cluster master ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker, code, signal) => {
		console.error(
			`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
		);
	});
} else {
	const app = express();

	app.use(
		helmet({
			contentSecurityPolicy: false,
		})
	);

	// Run body parser middleware
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	// Priority serve any static files.
	app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

	//Import routes
	require("./routes/getmedia")(app);
	require("./routes/changemedia.js")(app);

	app.get("/api", function (req, res) {
		res.set("Content-Type", "application/json");
		res.send('{"message":"Hello from the custom server!"}');
	});

	// All remaining requests return the React app, so it can handle routing.
	app.get("*", function (request, response) {
		response.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"));
	});

	app.listen(PORT, function () {
		console.error(
			`Node ${isDev ? "dev server" : "cluster worker " + process.pid}: listening on port ${PORT}`
		);
	});
}
