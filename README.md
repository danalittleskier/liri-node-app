# LIRI Bot

LIRI is a command line node app that takes in parameters and gives you back data by connecting to different APIs.

### Overview

LIRI will search the following APIs: Spotify for songs, Bands in Town for concerts, and OMDB for movies.
It takes input from the command line if the request is `concert-this`, `movie-this`, or `spotify-this-song` or from the `random.txt` file if the request is `do-what-it-says`.
It also logs the results out to `log.txt`.

### Technologies

This app is written in Javascript with Node and following packages

* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

* [Axios](https://www.npmjs.com/package/axios)

* You'll use Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

* [Moment](https://www.npmjs.com/package/moment)

* [DotEnv](https://www.npmjs.com/package/dotenv)

### Instructions

1. Install node.js in order to be able to run CLI app
2. After you downloaded cloned the repository run npm install to add all the modules need it from the `package.json` file
4. In order to use the spotify API you need to store your ID and Secret keys in the .env folder
5. Run `node liri` if you want to see the default case the runs the application with inputs from the `random.txt` file
6. From the command line use `concert-this` as the argument followed by the name of the band or artist if you want to search the Bands In Town API (e.g. `node liri concert-this Madonna`) 
7. From the command line use `movie-this` as the argument followed by the name of the movie if you want to search the OMDB API (e.g. `node liri movie-this Gladiator`)
8. From the command line use `spotify-this-song` as the argument followed by the name of the song you want to search the Spotify API (e.g. `node liri spotify-this-song the final countdown`)
9. From the command line use `do-what-it-says` as the argument and it will run with the options listed in the `random.txt` file
10. All the outputs will be logged to the console and to the log.txt file