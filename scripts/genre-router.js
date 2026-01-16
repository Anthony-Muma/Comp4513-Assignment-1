const dataProvider = require("./data-provider.js");
const { dbAll, dbGet } = dataProvider;

const genreSql = `
    SELECT
       genre_name
    FROM
        genres
    ; 
`;

function handleAllGenres(app) {
    app.get('/api/genres', async (req, resp) => {
        try {
            const rows = await dbAll(genreSql);
            resp.json(rows);
        } catch (error) {
            console.log(error.message);
            resp.status(500).json({ error: error.message });
        }     
    });
}

module.exports = {
    handleAllGenres
};