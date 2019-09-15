require("dotenv").config();
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var moment = require('moment');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

//grab arguments from command line
var nodeArgs = process.argv;
var queryRequest = process.argv[2];

//store arguments to use in all functions
var searchtext = grabArguments(nodeArgs);

//concatinate arguments with a '+'
function grabArguments(nodeArgs) {
    var arguments = "";
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            arguments = arguments + "+" + nodeArgs[i];
        } else {
            arguments += nodeArgs[i];

        }
    }
    return arguments;
}

//check if reading input from a file than grab arguments from file
//then callAPI function with the respective query request and search term
if (queryRequest === "do-what-it-says" || queryRequest === undefined) {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        queryRequest = dataArr[0];
        searchtext = dataArr[1];
        callAPI(queryRequest);

    });
} else {
    callAPI(queryRequest);
}



//call API depending on the query request
function callAPI(queryRequest) {
    // console.log(queryRequest);
    // console.log(searchtext);
    if (queryRequest === "spotify-this-song") {
        if (searchtext === "") {
            searchtext = "The Sign";
        }
        spotify
            .search({ type: 'track', limit: 2, query: searchtext })
            .then(function (response) {
                //console.log(response.tracks);
                var showData = [
                    "-------Song------",
                    "Song name:  " + response.tracks.items[0].name,
                    "Album:  " + response.tracks.items[0].album.name,
                    "Preview:  " + response.tracks.items[0].preview_url,
                    "Artist:  " + response.tracks.items[0].artists[0].name,
                    "----------------------"
                ].join("\n\n");
                console.log(showData);

                logOutput(showData);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    else {
        if (queryRequest === "concert-this") {
            if (searchtext === "") {
                searchtext = "Dave Matthews Band";
            }

            var bandAPI = "https://rest.bandsintown.com/artists/" + searchtext + "/events?app_id=codingbootcamp";

            //console.log(bandAPI);
            axios.get(bandAPI).then(
                function (response) {
                    //console.log(response);
                    if (response.data.length > 0) {
                        var showData = [
                            "-------Bands------",
                            "Band: " + response.data[0].lineup[0],
                            "Venue:  " + response.data[0].venue.name,
                            "City:  " + response.data[0].venue.city + " State " + response.data[0].venue.region,
                            "Date:  " + moment(response.data[0].datetime).format('MM/DD/YYYY'),
                            "----------------------"
                        ].join("\n\n");
                        console.log(showData);

                        logOutput(showData);
                    }
                    else {
                        console.log("BAND NOT FOUND!");
                    }

                }).catch(err);
        }
        if (queryRequest === "movie-this") {
            if (searchtext === "") {
                searchtext = "Mr. Nobody";
            }
            var movieAPI = "http://www.omdbapi.com/?t=" + searchtext + "&y=&plot=short&apikey=trilogy";
            axios.get(movieAPI).then(
                function (response) {
                    var showData = [
                        "-------Movie------",
                        "Title:  " + response.data.Title,
                        "Year:  " + response.data.Year,
                        "Rating:  " + response.data.imdbRating,
                        "Ratings - Rotten Tomatoes:  " + response.data.Ratings[1].Value,
                        "Country:  " + response.data.Country,
                        "Language:  " + response.data.Language,
                        "Actors:  " + response.data.Actors,
                        "Plot:  " + response.data.Plot,
                        "----------------------"
                    ].join("\n\n");
                    console.log(showData);
                    logOutput(showData);
                }).catch(err);
        }
    }

    function err(error) {
        if (error.response) {

            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        console.log(error.config);
    };
}

//function that handles output to log.txt
function logOutput(text) {
    fs.appendFile("log.txt", text, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Content Added to log.txt");
        }

    });
}
