const express = require("express");

// create express app
const app = express();

// set up route handling 
const artistRouter = require('./scripts/artists-router.js');
const { handleAllArtist, handleArtistRef, handleAverageRef } = artistRouter;
handleAllArtist(app);
handleArtistRef(app);
handleAverageRef(app);

// use express to listen to port 
let port = process.env.PORT; 
app.listen(port, () => { 
    console.log("Server running at port = " + port); 
});