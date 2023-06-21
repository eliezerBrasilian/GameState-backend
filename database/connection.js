require('dotenv').config();
const { database, host, port, user, password } = process.env;
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: `postgres://${user}:${password}@motty.db.elephantsql.com/${user}`,
    ssl: true,
  },
});

module.exports = db;

// var knex = require('knex')({
//   client: 'mysql2',
//   connection: {
//     host: host,
//     port: port,
//     user: user,
//     password: password,
//     database: database,
//   },
// });

// module.exports = knex;
