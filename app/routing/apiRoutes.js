// dependencies
var path = require("path");
var friends = require("../data/friends");

// GET & POST routes
var api = function(app) {
    // GET - display JSON of all possible friends
    app.get("/api/friends", function(request, response) {
        return response.json(friends);
    });

    // POST - handle incoming survey results & compatibility logic
    app.post("/api/friends", function(request, response) {
        // store JSON post from survey
        var newFriend = request.body;
        var newScores = newFriend.scores;

        // use RegEx Pattern to remove spaces
        newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

        // COMPATIBILITY LOGIC //


        // add to friends
        friends.push(newFriend);
        response.json(newFriend);
    });
};

module.exports = api; 