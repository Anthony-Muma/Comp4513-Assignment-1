const express = require("express");
const app = express();

// route handling 
const artistRouter = require('./scripts/artists-router.js');
artistRouter.handleAllArtist(app);
artistRouter.handleArtistRef(app);
artistRouter.handleArtistRefAverage(app);

const genreRouter = require('./scripts/genre-router.js');
genreRouter.handleAllGenres(app);

const playlistRouter = require('./scripts/playlists-router.js');
playlistRouter.handlePlaylistsRef(app);

const songsRouter = require('./scripts/songs-router.js');
songsRouter.handleAllSongs(app);
songsRouter.handleAllSongsSort(app);
songsRouter.handleSongsRef(app);
songsRouter.handleSongsSearchBegin(app);
songsRouter.handleSongsSearchAny(app);
songsRouter.handleSongsSearchYear(app);
songsRouter.handleSongsArtistRef(app);
songsRouter.handleSongsGenreRef(app);

const moodRouter = require('./scripts/mood-router.js');
moodRouter.handleDancingMoodRef(app);
moodRouter.handleHappyMoodRef(app);
moodRouter.handleCoffeeMoodRef(app);
moodRouter.handleStudyingMoodRef(app);


// listen to port 
const port = process.env.PORT || 3000; 
app.listen(port, () => { 
    console.log("Server running at port = " + port); 
});