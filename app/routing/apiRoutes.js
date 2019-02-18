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
        console.log("User scores:");
        console.log(newScores);

        // best match
        var match = {};
        var matchIndex = 0;
        var matchDifference = 100;   // greatest match difference between total scores

        // convert input scores to integers
        for (var i = 0; i < newScores.length; i++) {
            newScores[i] = parseInt(newScores[i]);
        }

        // compatibility logic //
        // total difference between new scores and other user scores
        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;
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
        console.log("Match:");
        console.log(match);

        // add newFriend to friends array
        friends.push(newFriend);

        // send response
        response.json(match);
    });
};

module.exports = api; 