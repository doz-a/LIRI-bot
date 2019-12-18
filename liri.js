// dotenv passwords
require("dotenv").config();

// Moment npm package 
var moment = require('moment');

// fs core package 
var fs = require('fs');

// axios package 
var axios = require("axios");

// Spotify package 
var Spotify = require('node-spotify-api');

// api key for spotify
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// Sets process 2 and 3 as shorter arguments 
var arg2 = process.argv[2];
var arg3 = process.argv[3];

// Read txt file, run with do-what-it-says
function readText() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        var dataArr = data.split(",");

        // Calls switch case 
        switcher(dataArr[0], dataArr[1]);
    });
};

// Get movie data, run with movie-this "movie"
function getMovie(movieName) {

    // If no movie name, do a search for Mr.Nobody
    if (!movieName) {
        var movieName = "Mr. Nobody";
    }

    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    axios.get(queryURL).then(
        function (response) {

            // Movie info
            console.log(`Title: ${response.data.Title}
Year: ${response.data.Year}
Rated: ${response.data.Rated}
Rotten Tomatoes Rating: ${response.data.tomatoRating}
Country Produced in: ${response.data.Country}
Language: ${response.data.Language}
Plot: ${response.data.Plot}
Actors: ${response.data.Actors}`
            );
        }
    )
}

// Start Music Function, run with 
function getMusic(songName) {

    // If no song name, defaults The Sign by Ace
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

// Get concert function, run with concert-this
function getConcert(bandName) {
    var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
        function (response) {

            // Loop that shows all events 
            for (let i = 0; i < response.data.length; i++) {
                const show = response.data[i];

                // Name of venue 
                console.log("Venue Name: " + show.venue.name);

                // Location of venue 
                console.log("Location: " + show.venue.city + ", " + show.venue.region + ", " + show.venue.country);

                // Time of show 
                console.log("Show Time: " + moment(show.datetime).format("MM/DD/YYYY"));
                console.log("--------------------")
            }
        }
    )
}

// Reads arguments 2 and 3, runs that command, runs function of the command 
function switcher(arg2, arg3) {

    switch (arg2) {
        case "spotify-this-song":
            getMusic(arg3);
            break;
        case "do-what-it-says":
            readText();
            break;
        case "movie-this":
            getMovie(arg3);
            break;
        case "concert-this":
            getConcert(arg3);
            break;
    }
}
switcher(arg2, arg3);