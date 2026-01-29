const pool = require("./pool");

async function createUser({ firstname, lastname, username, hashPassword }) {
    console.log("password:", hashPassword);
    await pool.query(
        "INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)",
        [firstname, lastname, username, hashPassword],
    );
}

async function getUserByUsername(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username=$1", [
        username,
    ]);
    return rows;
}
async function getUserById(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    return rows;
}

async function updateMembership(id) {
    await pool.query("UPDATE users SET member=true WHERE id=$1", [+id]);
}

async function insertNewMessage({ title, text }, userId) {
    await pool.query(
        "INSERT INTO messages (title, message, added, authorid) VALUES ($1,$2, NOW(), $3)",
        [title, text, userId],
    );
}

async function getAllMessages() {
    const { rows } = await pool.query(
        "SELECT users.id AS userId, firstname, lastname, member, admin, messages.id AS messageId, title, message, added, authorid FROM users JOIN messages ON users.id = authorid",
    );
    return rows;
}

async function updateAdminStatus(id) {
    await pool.query("UPDATE users SET admin=true WHERE id=$1", [id]);
}

async function deleteMessage(id) {
    await pool.query("DELETE FROM messages WHERE id=$1", [id]);
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserById,
    updateMembership,
    insertNewMessage,
    getAllMessages,
    updateAdminStatus,
    deleteMessage,
};
