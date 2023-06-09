require('dotenv').config();

const knex = require('knex');
const { database, host, port, user, password, urlElephantSQL } = process.env;
const db = knex({
  client: 'pg',
  connection: {
    connectionString: urlElephantSQL,
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
