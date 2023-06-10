let knex = require('../database/connection');
class Game {
  async new(id_usuario, id_console, nome, descricao, capa, finishedDate) {
    try {
      await knex
        .insert({
          id_usuario: id_usuario,
          id_console: id_console,
          nome: nome,
          descricao: descricao,
          capa: capa,
          finishedDate: finishedDate,
        })
        .table('jogos_tb');
      console.log('inseriu game');
      return true;
    } catch (e) {
      console.log('Erro ao inserir game: ' + e);
      return false;
    }
  }
}

module.exports = new Game();
