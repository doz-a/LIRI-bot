require("dotenv").config();

var axios = require("axios");

var Spotify = require('node-spotify-api');


var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// Get movie data using axios 
function getMovie(movieName) {


    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(
        function (response) {
            console.log(response.data);
        }
    )

}

// getMovie("spaceballs");
// Output movie data into terminal

// Start Music Function 
function getMusic(songName) {

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var trackObj = data.tracks.items[0];

        //  * Artist(s)
        console.log(trackObj.artists[0].name);

        //  * The song's name
        console.log(trackObj.name);

        //  * A preview link of the song from Spotify
        console.log(trackObj.external_urls.spotify);

        //  * The album that the song is from
        console.log(trackObj.album.name);
    });
}

// getMusic("7 rings");

// Node command to run the get Music function
if (process.argv[2] === "spotify-this-song") {
    var songName = process.argv[3];
    if (!songName) {
        var songName = "The Sign";
    }
    getMusic(songName);
}