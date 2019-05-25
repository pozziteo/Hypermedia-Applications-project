const knex = require("knex");

let local = {
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'postgres'
};

let database = knex({
    client: "pg",
    connection: local,
    ssl: true,
    debug: true
});

module.exports = { database: database };