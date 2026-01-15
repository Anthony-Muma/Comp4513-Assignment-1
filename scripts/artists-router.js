const dataProvider = require("./data-provider.js");
const { dbAll, dbGet } = dataProvider;

// Queries
// Note: These do not end with a ';'
const artistSql = `
    SELECT
        a.artist_id,
        a.artist_name,
        t.type_name,
        a.artist_image_url,
        a.spotify_url,
        a.spotify_desc
    FROM
        artists a
        JOIN types t ON a.artist_type_id = t.type_id
    `;

const averagesSql = `
    SELECT
        AVG(s.bpm) AS bpm,
        AVG(s.energy) AS energy,
        AVG(s.danceability) AS danceability,
        AVG(s.loudness) AS loudness,
        AVG(s.liveness) AS liveness,
        AVG(s.valence) AS valence,
        AVG(s.duration) AS duration,
        AVG(s.acousticness) AS acousticness,
        AVG(s.speechiness) AS speechiness,
        AVG(s.popularity ) AS popularity
    FROM
        artists a
        JOIN songs s ON s.artist_id = a.artist_id
    WHERE 
        a.artist_id=?
    `;

function handleAllArtist(app) {
    app.get('/api/artists', async (req, resp) => {
        try {
            const rows = await dbAll(artistSql + ";");
            resp.json(rows);
        } catch (error) {
            resp.status(500).json({ error: error.message });
        }     
    });
}

function handleArtistRef(app) {
    app.get('/api/artists/:ref', async (req, resp) => {
        try {
            const ref = [req.params.ref];
            const row = await dbGet(artistSql + "WHERE a.artist_id=?;", ref);
            if (row) resp.json(row);
            else resp.status(400).json({ error: `artist ${ref} was not found` });
        } catch (error) {
            console.log(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

function handleAverageRef(app) {
    app.get('/api/artists/averages/:ref', async (req, resp) => {
        try {
            const ref = [req.params.ref];
            const row = await dbGet(averagesSql + ";", ref);
            if (row) resp.json(row);
            else resp.status(400).json({ error: `artist ${ref} was not found` });
        } catch (error) {
            console.log(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

module.exports = {
    handleAllArtist,
    handleArtistRef,
    handleAverageRef
}