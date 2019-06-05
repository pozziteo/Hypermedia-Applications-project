const knex = require("knex");

let local = {
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'BookStore'
};

let database = knex({
    client: "pg",
    connection: process.env.DATABASE_URL || local,
    ssl: true,
    debug: true
});

module.exports = { database: database };