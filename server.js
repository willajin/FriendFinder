// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// set up express app
var app = express();
var PORT = process.env.PORT || 3000;

// express middleware to access public files
app.use(express.static("./app/public"));

// express middleware to handle data parsing
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// routes
require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes")(app);

// server listen
app.listen(PORT, function() {
    console.log("FriendFinder App is listening on PORT " + PORT);
});