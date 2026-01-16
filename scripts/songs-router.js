const dataProvider = require("./data-provider.js");
const { dbAll, dbGet } = dataProvider;

// note: these do not end with a ';'
const songSql = `
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
            const rows = await dbAll(songSql + "ORDER BY 2;");
            resp.json(rows);
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

function handleAllSongsSort(app) {
    app.get('/api/songs/sort/:order', async (req, resp) => {
        try {
            let chosenColumn;
            switch (req.params.order) {
                case "id":
                    chosenColumn = "s.song_id"
                    break;
                case "title":
                    chosenColumn = "s.title"
                    break;
                case "artist":
                    chosenColumn = "a.artist_name"
                    break;
                case "genre":
                    chosenColumn = "g.genre_name"
                    break;
                case "year":
                    chosenColumn = "s.year"
                    break;
                case "duration":
                    chosenColumn = "s.duration"
                    break;
                default:
                    resp.status(404).json({ error: `could not order by ${req.params.order}` });
            }
            const rows = await dbAll(songSql + `ORDER BY ${chosenColumn};`);
            resp.json(rows);
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
            const row = await dbGet(songSql + "WHERE s.song_id=?;", ref);
            if (row) resp.json(row);
            else resp.status(404).json({ error: `song ${ref} was not found` });
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}


module.exports = {
    handleAllSongs,
    handleAllSongsSort,
    handleSongsRef
};