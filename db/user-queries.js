const db = require('./db');

const getUsers = () => db.query(`SELECT * FROM users;`)
    .then(data => data.rows);

const getUserById = (id) => db.query(`SELECT * FROM users WHERE id = $1;`, [id])
    .then(data => data.rows);

module.exports = { getUsers, getUserById }