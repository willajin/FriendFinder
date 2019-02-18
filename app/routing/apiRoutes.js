// dependencies
var path = require("path");
var friends = require("../data/friends");

// GET & POST routes
var api = function (app) {
    // GET - display JSON of all possible friends
    app.get("/api/friends", function (request, response) {
        return response.json(friends);
    });

    // POST - handle incoming survey results & compatibility logic
    app.post("/api/friends", function (request, response) {
        // store JSON post from survey
        var newFriend = request.body;
        var newScores = newFriend.scores;
        console.log(newScores);

        // best match
        var match = {};
        var matchIndex = 0;
        var matchDifference = 40;   // greatest match difference between total scores

        // use RegEx Pattern to remove spaces
        newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

        // COMPATIBILITY LOGIC //
        // total difference between new scores and other user scores
        var totalDifference = 0;
        for (var i = 0; i < friends.length; i++) {
            for (var j = 0; j < newScores.length; j++) {
                totalDifference += Math.abs(friends[i].scores[j] - newScores[j]);
            }

            // compare if totalDifference is less than greatest match difference
            if (totalDifference < matchDifference) {
                matchDifference = totalDifference;
                matchIndex = i;
            }
        }

        // push best match
        match = friends[matchIndex];

        // add newFriend to friends array
        friends.push(newFriend);

        // send response
        response.json(match);
    });
};

module.exports = api; 