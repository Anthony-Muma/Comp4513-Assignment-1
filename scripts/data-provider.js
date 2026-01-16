const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const DB_PATH = path.join(__dirname, "../data/songs-2026.db");
const db = new sqlite3.Database(DB_PATH);

// wrapper functions
function dbAll(sql, params = []) {
    
    // works out to cleaner code using async and await
    // instead of using callbacks
    return new Promise( (resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbGet(sql, params) {
    return new Promise( (resolve, reject) => {
        db.get(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}


// function dbAll(sql, params, callback) {
//     db.all(sql, params, callback);
// }

// function dbGet(sql, params, callback) {
//     db.get(sql, params, callback);
// }

// function dbEach(sql, params, callback) {
//     db.each(sql, params, callback);
// }

module.exports = {
    dbAll,
    dbGet
};