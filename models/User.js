let knex = require('../database/connection');
let bcrypt = require('bcrypt');
class User {
  async new(email, nome, senha) {
    try {
      await knex.insert({ email, nome, senha }).table('usuario_tb');
      console.log('inseriu');
    } catch (err) {
      console.log(err);
    }
  }
  async findEmail(email) {
    try {
      let q = await knex.select('*').from('usuario_tb').where({ email: email });
      return q.length > 0 ? true : false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async findByEmail(email) {
    try {
      var result = await knex
        .select('*')
        .where({ email: email })
        .table('usuario_tb');

      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
}

module.exports = new User();