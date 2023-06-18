let knex = require('../database/connection');

class Console {
  async listConsoles() {
    try {
      var result = await knex
        .select('*')
        .table('consoles_tb')
        .orderBy('id', 'desc');
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

module.exports = new Console();
