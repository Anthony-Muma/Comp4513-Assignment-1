const dataProvider = require("./data-provider.js");
const { dbAll, dbGet } = dataProvider;

const genreSql = `
    SELECT
        p.playlist_id,
        s.song_id,
        s.title,
        a.artist_name,
        g.genre_name,
        s.year
    FROM
        playlists p
        JOIN songs s ON s.song_id = p.song_id
        JOIN genres g ON g.genre_id = s.genre_id
        JOIN artists a ON a.artist_id = s.artist_id
    WHERE 
        p.playlist_id=?
    ;
`;

function handlePlaylistsRef(app) {
    app.get('/api/playlists/:ref', async (req, resp) => {
        try {
            const ref = [req.params.ref];
            const rows = await dbAll(genreSql, ref);
            if (rows) resp.json(rows);
            else resp.status(400).json({ error: `playlist ${ref} was not found` });
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

module.exports = {
    handlePlaylistsRef
};