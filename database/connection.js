require('dotenv').config();

const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    connectionString:
      'postgres://fwibogvq:05PJlaULYDIHU6Pr34fnTOQ2lth1sNyb@motty.db.elephantsql.com/fwibogvq',
    ssl: true,
  },
});
// Exemplo de seleção de dados

// const { database, host, user, password } = process.env;
// var knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host: host,
//     user: user,
//     password: password,
//     database: database,
//   },
// });

module.exports = db;
