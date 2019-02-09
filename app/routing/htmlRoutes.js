// dependencies
var path = require("path");

// GET routes
var html = function(app) {
    // home page
    app.get("/", function(request, response) {
        response.sendFile(path.join(__dirname, "../public/home.html"));
    });

    // survey page
    app.get("/survey", function(request, response) {
        response.sendFile(path.join(__dirname, "../public/survey.html"));
    });
};

module.exports = html; 