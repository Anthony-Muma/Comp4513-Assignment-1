const dataProvider = require("./data-provider.js");
const { dbAll, dbGet } = dataProvider;

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

function normalizeLimit(ref) {
    const parsedIntRef = parseInt(ref);
    if (!parsedIntRef || 
        parsedIntRef < 1 || 
        parsedIntRef > MAX_LIMIT
    ) return DEFAULT_LIMIT;
    return parsedIntRef;
}

function handleDancingMoodRef(app) {
    app.get('/api/mood/dancing{/:ref}', async (req, resp) => {
        try {
            const ref = normalizeLimit(req.params.ref);
            const rows = await dbAll(SONG_SQL + "ORDER BY s.danceability DESC LIMIT ? ;", [ref]);
            resp.json(rows);
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

function handleHappyMoodRef(app) {
    app.get('/api/mood/happy{/:ref}', async (req, resp) => {
        try {
            const ref = normalizeLimit(req.params.ref);
            const rows = await dbAll(SONG_SQL + "ORDER BY s.valence DESC LIMIT ? ;", [ref]);
            resp.json(rows);
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}


function handleCoffeeMoodRef(app) {
    app.get('/api/mood/coffee{/:ref}', async (req, resp) => {
        try {
            const ref = normalizeLimit(req.params.ref);
            const rows = await dbAll(SONG_SQL + "ORDER BY (s.liveness / s.acousticness) DESC LIMIT ? ;", [ref]);
            resp.json(rows);
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}


function handleStudyingMoodRef(app) {
    app.get('/api/mood/studying{/:ref}', async (req, resp) => {
        try {
            const ref = normalizeLimit(req.params.ref);
            const rows = await dbAll(SONG_SQL + "ORDER BY s.energy * s.speechiness ASC LIMIT ? ;", [ref]);
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