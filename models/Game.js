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
  async listGames(id_usuario, pageNumber, pageSize) {
    try {
      const offset = (pageNumber - 1) * pageSize;

      const games = knex
        .select([
          'j.id',
          'j.nome',
          'j.capa',
          'j.descricao',
          'j.finisheddate',
          'c.nome as nome_console',
          'c.id as id_console',
        ])
        .from('jogos_tb as j')
        .innerJoin('consoles_tb as c', 'j.id_console', '=', 'c.id')
        .where({ 'j.id_usuario': parseInt(id_usuario) })
        .offset(offset)
        .limit(pageSize)
        .orderBy('j.id', 'desc');
      console.log('sucesso');

      return games;

      // knex('jogos_tb')
      //   .join('consoles_tb', 'jogos_tb.id_console', '=', 'consoles_tb.id')
      //   .select('*')
      //   .where({ id_usuario: id_usuario });

      // console.log('users');
      // console.log(users);
      // await knex('jogos_tb')
      //   .select('*')
      //   .where({ id_usuario: id_usuario })
      //   .offset(offset)
      //   .limit(pageSize)
      //   .orderBy('id', 'desc');
    } catch (error) {
      //throw new Error('Erro ao obter usuários: ' + error.message);
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
  async editGame(id_usuario, id_game, id_console, nome, capa, finisheddate) {
    try {
      await knex('jogos_tb')
        .update({
          id_console: id_console,
          nome: nome,
          capa: capa,
          finisheddate: finisheddate,
        })
        .where({ id: id_game, id_usuario: id_usuario });
      return true;
    } catch (error) {
      return false;
    }
  }
}
/*update jogos_tb set nome='CELESTE 1' where id=128 and id_usuario=1;*/

module.exports = new Game();
