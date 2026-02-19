const dataProvider = require("./data-provider.js");
const { dbAll } = dataProvider;

// resp.status
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status

const ARTIST_SQL = `
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

const AVERAGES_SQL = `
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

/**
 * ***./api/artists***
 * 
 * Returns all data for all artists sorted by artist_name.
 * @param {import('express').Application} app - Express app
 */
function handleAllArtist(app) {
    app.get('/api/artists', async (req, resp) => {
        try {
            const rows = await dbAll(ARTIST_SQL + "ORDER BY 2");
            resp.json(rows);
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

/**
 * ***./api/artists/:ref***
 * 
 * Returns just the specified artist using the artist_id field,
 * 
 * e.g., /api/artists/129
 * @param {import('express').Application} app - Express app
 */
function handleArtistRef(app) {
    app.get('/api/artists/:ref', async (req, resp) => {
        try {
            const ref = req.params.ref;
            const rows = await dbAll(AVERAGES_SQL + "WHERE a.artist_id=?", [ref]);
            if (rows.length > 0) resp.json(rows);
            else resp.status(400).json({ error: `artist of id '${ref}' was not found` });
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

/**
 * ***./api/artists/averages/:ref***
 * 
 * Returns the average values for bpm, energy, 
 * danceability,loudness,liveness,valence,duration, 
 * acousticness, speechineess, popularity for the specified 
 * artist using the artist_id field
 * @param {import('express').Application} app - Express app
 */
function handleArtistRefAverage(app) {
    app.get('/api/artists/averages/:ref', async (req, resp) => {
        try {
            const ref = req.params.ref;
            const rows = await dbAll(averagesSql, [ref]);
            if (rows.length > 0) resp.json(rows);
            else resp.status(400).json({ error: `artist of id '${ref}' was not found` });
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

module.exports = {
    handleAllArtist,
    handleArtistRef,
    handleArtistRefAverage
};