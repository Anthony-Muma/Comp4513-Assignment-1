const express = require("express");

// create express app
const app = express();

// set up route handling 
const artistRouter = require('./scripts/artists-router.js');
const { handleAllArtist, handleArtistRef, handleArtistRefAverage } = artistRouter;
handleAllArtist(app);
handleArtistRef(app);
handleArtistRefAverage(app);

const genreRouter = require('./scripts/genre-router.js');
const { handleAllGenres } = genreRouter;
handleAllGenres(app);

const playlistRouter = require('./scripts/playlists-router.js');
const { handlePlaylistsRef } = playlistRouter;
handlePlaylistsRef(app);

const songsRouter = require('./scripts/songs-router.js');
const { handleAllSongs, handleAllSongsSort, handleSongsRef } = songsRouter;
handleAllSongs(app);
handleAllSongsSort(app);
handleSongsRef(app);

// use express to listen to port 
let port = process.env.PORT; 
app.listen(port, () => { 
    console.log("Server running at port = " + port); 
});