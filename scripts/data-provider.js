const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const DB_PATH = path.join(__dirname, "../data/songs-2026.db");
const db = new sqlite3.Database(DB_PATH);

/**
 * Promise wrapper for db.all
 * @param {string} sql 
 * @param {*} params 
 * @returns 
 */
function dbAll(sql, params = []) {
    return new Promise( (resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

/**
 * Promise wrapper for db.get
 * @param {string} sql 
 * @param {*} params 
 * @returns 
 */
function dbGet(sql, params = []) {
    return new Promise( (resolve, reject) => {
        db.get(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

module.exports = {
    dbAll,
    dbGet
};