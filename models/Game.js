let knex = require('../database/connection');
class Game {
  async new(id_usuario, id_console, nome, descricao, capa, finisheddate) {
    try {
      await knex
        .insert({
          id_usuario: id_usuario,
          id_console: id_console,
          nome: nome,
          descricao: descricao,
          capa: capa,
          finisheddate: finisheddate,
        })
        .table('jogos_tb');
      console.log('inseriu game');
      return true;
    } catch (e) {
      console.log('Erro ao inserir game: ' + e);
      return false;
    }
  }
  async listGames(id_usuario) {
    try {
      var result = await knex
        .select('*')
        .table('jogos_tb')
        .where({ id_usuario: id_usuario })
        .orderBy('id', 'desc');
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async deleteGame(id_game) {
    try {
      let result = await knex('jogos_tb').where('id', id_game).del();
      console.log('result: ' + result);
      if (result == 1) {
        return true;
      } else return false;
    } catch (e) {
      console.log('nao pode ser excluido');
      return false;
    }
  }
}

module.exports = new Game();
