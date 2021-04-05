const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const app = express();

let routes = require("./server/routes");

// Parsers
app.use(bodyParser.urlencoded({ limit: '17mb', extended: false}));
app.use(bodyParser.json({ limit: '17mb' }));

app.disable('x-powered-by');

// Angular DIST output folder
app.use(express.static(path.join(__dirname, "dist")));

let apiRoutes = new routes(app);

// Send all other requests to the Angular app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
});

// Set Port
const port = process.env.PORT || "4200";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
