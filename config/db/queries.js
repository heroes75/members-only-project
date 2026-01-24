const pool = require('./pool')

async function createUser({firstname, lastname, username, hashPassword}) {
    console.log('password:', hashPassword)
    await pool.query('INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)', [firstname, lastname, username, hashPassword])
}

async function getUserByUsername(username) {
    const { rows } = await pool.query('SELECT * FROM users WHERE username=$1', [username])
    return rows
}
async function getUserById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [id])
    return rows
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserById,

}