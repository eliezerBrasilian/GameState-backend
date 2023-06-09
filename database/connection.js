require('dotenv').config();
const { database, host, user, password } = process.env;
var knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: host,
    user: user,
    password: password,
    database: database,
  },
});

module.exports = knex;
