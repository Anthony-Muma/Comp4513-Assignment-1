const dataProvider = require("./data-provider.js");
const { dbAll } = dataProvider;

const GENRE_SQL = `SELECT * FROM genres`;

/**
 * ***./api/genres***
 * 
 * Returns all the genres
 * @param {import('express').Application} app - Express app
 */
function handleAllGenres(app) {
    app.get('/api/genres', async (req, resp) => {
        try {
            const rows = await dbAll(GENRE_SQL);
            resp.json(rows);
        } catch (error) {
            console.error(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

module.exports = {
    handleAllGenres
};