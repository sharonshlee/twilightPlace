const db = require('./db');
console.log('$$$$$$!@$!@$@$!!@$!$!@$@!$!@$!@$!@$!@$', db);
const getUsers = (db) => db.query(`SELECT * FROM users;`)
    .then(data => data.rows);

const getUserById = (id) => db.query(`SELECT * FROM users WHERE id = $1;`, [id])
    .then(data => data.rows);

module.exports = { getUsers, getUserById }
