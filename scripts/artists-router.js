const dataProvider = require("./data-provider.js");
const { dbAll } = dataProvider;

function Artist(artist_id, artist_name, type_name, artist_image_url, spotify_url, spotify_desc) {
    this.artist_id = artist_id;
    this.artist_name = artist_name;
    this.type_name = type_name;
    this.artist_image_url = artist_image_url;
    this.spotify_url = spotify_url;
    this.spotify_desc = spotify_desc;
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
    ;`;

function handleAllArtist(app) {
    app.get('/api/artists', async (req, resp) => {
        try {
            const rows = await dbAll(sql);
            const artists = rows.map(row => new Artist(
                row.artist_id, 
                row.artist_name, 
                row.type_name,
                row.artist_image_url,
                row.spotify_url,
                row.spotify_desc,
                )
            );
            resp.json(artists);
        } catch (error) {
            resp.status(500).json({ error: error.message });
        }     
    });
}

module.exports = {
    handleAllArtist
}