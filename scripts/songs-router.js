const dataProvider = require("./data-provider.js");
const { dbAll, dbGet } = dataProvider;

// note: these do not end with a ';'
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
function handleAllSongs(app) {
    app.get('/api/songs', async (req, resp) => {
        try {
            const rows = await dbAll(SONG_SQL + "ORDER BY 2;");
            resp.json(rows);
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

const SORT_COLUMNS = {
    id: "s.song_id",
    title: "s.title",
    artist: "a.artist_name",
    genre: "g.genre_name",
    year: "s.year",
    duration: "s.duration"
};

function handleAllSongsSort(app) {
    app.get('/api/songs/sort/:order', async (req, resp) => {
        try {
            const order = req.params.order;
            const columnToOrderBy = SORT_COLUMNS[order];
            if (!columnToOrderBy) resp.status(400).json({ error: `could not order by ${req.params.order}` });
            else {
                const rows = await dbAll(SONG_SQL + `ORDER BY ${columnToOrderBy};`);
                resp.json(rows);
            }
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

function handleSongsRef(app) {
    app.get('/api/songs/:ref', async (req, resp) => {
        try {
            const ref = [req.params.ref];
            const row = await dbGet(SONG_SQL + "WHERE s.song_id=?;", ref);
            if (row) resp.json(row);
            else resp.status(400).json({ error: `song ${ref} was not found` });
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

function handleSongsSearchBegin(app) {
    app.get('/api/songs/search/begin/:substring', async (req, resp) => {
        try {
            const substring = `${req.params.substring.toUpperCase()}%`;
            const rows = await dbAll(SONG_SQL + "WHERE UPPER(s.title) LIKE ?;", [substring]);
            resp.json(rows);
            // if (row) resp.json(row);
            // else resp.status(400).json({ error: `song ${ref} was not found` });
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

function handleSongsSearchAny(app) {
    app.get('/api/songs/search/any/:substring', async (req, resp) => {
        try {
            const substring = `%${req.params.substring.toUpperCase()}%`;
            const rows = await dbAll(SONG_SQL + "WHERE UPPER(s.title) LIKE ?;", [substring]);
            resp.json(rows);
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

function handleSongsSearchYear(app) {
    app.get('/api/songs/search/year/:substring', async (req, resp) => {
        try {
            const substring = req.params.substring;
            const rows = await dbAll(SONG_SQL + "WHERE s.year LIKE ?;", [substring]);
            resp.json(rows);
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

function handleSongsArtistRef(app) {
    app.get('/api/songs/artist/:ref', async (req, resp) => {
        try {
            const ref = req.params.ref;
            const rows = await dbAll(SONG_SQL + "WHERE s.artist_id=?;", [ref]);
            if (rows) resp.json(rows);
            else resp.status(400).json({ error: `song ${ref} was not found` });
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

function handleSongsGenreRef(app) {
    app.get('/api/songs/genre/:ref', async (req, resp) => {
        try {
            const ref = req.params.ref;
            const rows = await dbAll(SONG_SQL + "WHERE s.genre_id=?;", [ref]);
            if (rows) resp.json(rows);
            else resp.status(400).json({ error: `song ${ref} was not found` });
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

module.exports = {
    handleAllSongs,
    handleAllSongsSort,
    handleSongsRef,
    handleSongsSearchBegin,
    handleSongsSearchAny,
    handleSongsSearchYear,
    handleSongsArtistRef,
    handleSongsGenreRef

};