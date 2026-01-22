const { Client } = require('pg');
const { argv } = require('process');

const SQL = `
    CREATE TABLE users
    (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        firstname VARCHAR(100),
        lastname VARCHAR(100),
        member BOOLEAN DEFAULT FALSE,
        admin BOOLEAN DEFAULT FALSE,
    );

    CREATE TABLE messages
    (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title VARCHAR(100),
        message TEXT,
        added TIMESTAMP,
        authorId INTEGER REFERENCES users (id)
    );
`

const client = new Client({
    connectionString: argv[2]
})

async function main() {
    console.log('start seeding...');
    await client.query(SQL)
    console.log('end seeding');
    
}

main();