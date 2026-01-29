const { Client } = require("pg");
const { argv } = require("process");

const SQL = `
    CREATE TABLE IF NOT EXISTS users
    (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        firstname VARCHAR(100),
        lastname VARCHAR(100),
        username VARCHAR(100),
        password VARCHAR(100),
        member BOOLEAN DEFAULT FALSE,
        admin BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS messages
    (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title VARCHAR(100),
        message TEXT,
        added TIMESTAMP,
        authorId INTEGER REFERENCES users (id)
    );
`;

const client = new Client({
    connectionString: argv[2],
});

async function main() {
    console.log("start seeding...");
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("end seeding");
}

main();
