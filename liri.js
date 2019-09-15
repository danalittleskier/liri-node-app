require("dotenv").config();
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var moment = require('moment');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

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

//check if reading input from a file
if(queryRequest === "do-what-it-says" || queryRequest === undefined){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        var dataArr = data.split(",");
        queryRequest = dataArr[0];
        searchtext = grabArguments(dataArr[1]);
        callAPI(queryRequest);
      
      });
} else {
    callAPI(queryRequest);
}



//call API depending on the query request
function callAPI(queryRequest) {
    if (queryRequest === "spotify-this-song") {
        if(searchtext === ""){
            searchtext = "The Sign";
        }
        spotify
            .search({ type: 'track', limit: 2, query: searchtext })
            .then(function (response) {
                console.log("-------Song------");
                //console.log(response.tracks.items[0]);
                console.log("Song name:  " +response.tracks.items[0].name);
                console.log("Album:  " +response.tracks.items[0].album.name);
                console.log("Preview:  " +response.tracks.items[0].preview_url);
                console.log("Artist:  " +response.tracks.items[0].artists[0].name);

                console.log("----------------------");

            })
            .catch(function (err) {
                console.log(err);
            });
    }
    else {
        if (queryRequest === "concert-this") {
            if(searchtext === ""){
                searchtext = "Dave Matthews Band";
            }

            var bandAPI = "https://rest.bandsintown.com/artists/" + searchtext + "/events?app_id=codingbootcamp";
            axios.get(bandAPI).then(
                function (response) {
                    console.log("-------Bands------");
                    //console.log(response.data);
                    console.log("Band: " + response.data[0].lineup[0]);
                    console.log("Venue:  " + response.data[0].venue.name);
                    console.log("City:  " + response.data[0].venue.city + " State " + response.data[0].venue.region);
                    console.log("Date:  " + moment(response.data[0].datetime).format('MM/DD/YYYY'));

                    console.log("----------------------");

                }).catch(err);
        }
        if (queryRequest === "movie-this") {
            if(searchtext === ""){
                searchtext = "Mr. Nobody";
            }
            var movieAPI = "http://www.omdbapi.com/?t=" + searchtext + "&y=&plot=short&apikey=trilogy";
            axios.get(movieAPI).then(
                function (response) {
                    //console.log(response.data);
                    console.log("-------Movie------");
                    console.log("Title:  " + response.data.Title);
                    console.log("Year:  " + response.data.Year);
                    console.log("Rating:  " + response.data.imdbRating);
                    console.log("Ratings - Rotten Tomatoes:  " + response.data.Ratings[1].Value);
                    console.log("Country:  " + response.data.Country);
                    console.log("Language:  " + response.data.Language);
                    console.log("Actors:  " + response.data.Actors);
                    console.log("Plot:  " + response.data.Plot);

                    console.log("----------------------");

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



//callAPI(queryRequest);