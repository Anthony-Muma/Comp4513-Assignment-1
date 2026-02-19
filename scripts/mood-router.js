const dataProvider = require("./data-provider.js");
const { dbAll } = dataProvider;

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 20;

const SONG_SQL = `
    SELECT
    s.song_id,
    s.title,
    a.artist_name,
    g.genre_name,
    s.year,
    s.bpm,
    s.energy,
    s.danceability,
    s.loudness,
    s.liveness,
    s.valence,
    s.duration,
    s.acousticness,
    s.speechiness,
    s.popularity
FROM
    songs s
    JOIN artists a ON a.artist_id = s.artist_id
    JOIN genres g ON g.genre_id = s.genre_id
`

/**
 * A helper function for normalizing the user input 
 * string to a number between 1 and the MAX_LIMIT
 * @param {string} ref 
 * @returns {number} A number between 1 and MAX_LIMIT
 */
function normalizeLimit(ref) {
    const parsedIntRef = parseInt(ref);
    if (!parsedIntRef || 
        parsedIntRef < 1 || 
        parsedIntRef > MAX_LIMIT
    ) return DEFAULT_LIMIT;
    return parsedIntRef;
}

/**
 * ***./api/mood/dancing{/:ref}***
 * 
 * Returns the top number (determined by ref parameter) of 
 * songs sorted by danceability parameter in descending order
 * @param {import('express').Application} app - Express app
 */
function handleDancingMoodRef(app) {
    app.get('/api/mood/dancing{/:ref}', async (req, resp) => {
        try {
            const ref = normalizeLimit(req.params.ref);
            const rows = await dbAll(SONG_SQL + "ORDER BY s.danceability DESC LIMIT ?", [ref]);
            resp.json(rows);
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

/**
 * ***./api/mood/happy{/:ref}***
 * 
 * Returns the top number (determined by ref parameter) of 
 * songs sorted by valence parameter in descending order
 * @param {import('express').Application} app - Express app
 */
function handleHappyMoodRef(app) {
    app.get('/api/mood/happy{/:ref}', async (req, resp) => {
        try {
            const ref = normalizeLimit(req.params.ref);
            const rows = await dbAll(SONG_SQL + "ORDER BY s.valence DESC LIMIT ?", [ref]);
            resp.json(rows);
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

/**
 * ***./api/mood/coffee{/:ref}***
 * 
 * Returns the top number (determined by ref parameter) of 
 * songs sorted by liveness divided by acousticness in descending order. 
 * @param {import('express').Application} app - Express app
 */
function handleCoffeeMoodRef(app) {
    app.get('/api/mood/coffee{/:ref}', async (req, resp) => {
        try {
            const ref = normalizeLimit(req.params.ref);
            const rows = await dbAll(SONG_SQL + "ORDER BY (s.liveness / s.acousticness) DESC LIMIT ?", [ref]);
            resp.json(rows);
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

/**
 * ***./api/mood/studying{/:ref}***
 * 
 * Returns the top number (determined by ref parameter) of 
 * songs sorted by the product of the energy and speechiness 
 * parameters in ascending order. 
 * @param {import('express').Application} app - Express app
 */
function handleStudyingMoodRef(app) {
    app.get('/api/mood/studying{/:ref}', async (req, resp) => {
        try {
            const ref = normalizeLimit(req.params.ref);
            const rows = await dbAll(SONG_SQL + "ORDER BY s.energy * s.speechiness ASC LIMIT ?", [ref]);
            resp.json(rows);
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

module.exports = {
    handleDancingMoodRef,
    handleHappyMoodRef,
    handleCoffeeMoodRef,
    handleStudyingMoodRef
}