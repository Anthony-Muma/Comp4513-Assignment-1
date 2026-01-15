const dataProvider = require("./data-provider.js");
const { dbAll, dbGet } = dataProvider;

function Artist(artist_id, artist_name, type_name, artist_image_url, spotify_url, spotify_desc) {
    this.artist_id = artist_id;
    this.artist_name = artist_name;
    this.type_name = type_name;
    this.artist_image_url = artist_image_url;
    this.spotify_url = spotify_url;
    this.spotify_desc = spotify_desc;
}

function createArtistFromRow(row) {
    new Artist(
        row.artist_id, 
        row.artist_name, 
        row.type_name,
        row.artist_image_url,
        row.spotify_url,
        row.spotify_desc,
    );
}

const sql = `
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

function handleAllArtist(app) {
    app.get('/api/artists', async (req, resp) => {
        try {
            const rows = await dbAll(sql + ";");
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
            const row = await dbGet(sql + "WHERE a.artist_id=?;", ref);
            if (row) resp.json(row);
            else resp.status(400).json({ error: `${ref} was not found` });
        } catch (error) {
            console.log(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

module.exports = {
    handleAllArtist,
    handleArtistRef
}