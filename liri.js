require("dotenv").config();

var fs = require('fs');

var axios = require("axios");

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var arg2 = process.argv[2];
var arg3 = process.argv[3];

// Read txt file 
function readText() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr[0]);
        console.log(dataArr[1]);
        switcher(dataArr[0], dataArr[1]);
    });
};
// readText();

// Get movie data using axios 
function getMovie(movieName) {


    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(
        function (response) {
            console.log(response.data);
            // * Title of the movie.
            // * Year the movie came out.
            // * IMDB Rating of the movie.
            // * Rotten Tomatoes Rating of the movie.
            // * Country where the movie was produced.
            // * Language of the movie.
            // * Plot of the movie.
            // * Actors in the movie.
        }
    )

}

// getMovie("spaceballs");
// Output movie data into terminal

// Start Music Function 
function getMusic(songName) {
    // If no song name is input 
    if (!songName) {
        var songName = "The Sign Ace";
    }

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var trackObj = data.tracks.items[0];

        //  Artist(s)
        console.log(trackObj.artists[0].name);

        //  The song's name
        console.log(trackObj.name);

        //  A preview link of the song from Spotify
        console.log(trackObj.external_urls.spotify);

        //  The album that the song is from
        console.log(trackObj.album.name);
    });
}

// getMusic("7 rings");

// Node command to run the get Music function
// if (process.argv[2] === "spotify-this-song") {

//     var songName = process.argv[3];
// }

// Reads argument 2, runs that command, runs function of the command 
function switcher(arg2, arg3) {

    switch (arg2) {
        case "spotify-this-song":
            getMusic(arg3);
            break;
        case "do-what-it-says":
            readText();
            break;

    }
}
switcher(arg2, arg3);