let Game = require('../models/Game');

class GameController {
  async saveGame(req, res) {
    let { id_usuario, id_console, nome, descricao, capa, finishedDate } =
      req.body;

    //verificar antes
    let IsGameSaved = await Game.new(
      id_usuario,
      id_console,
      nome,
      descricao,
      capa,
      finishedDate
    );
    if (IsGameSaved) {
      res.status(200);
      res.send({ success: 'dados inseridos' });
    } else {
      res.status(403);
      res.send({ err: 'falha ao inserir' });
    }
  }
  async listGames(req, res) {
    let id_usuario = req.params.id;
    if (id_usuario === undefined) {
      res.status(404);
      res.send('id invalido');
      return;
    }
    res.status(200);
    let games = await Game.listGames(id_usuario);
    res.send({ games: games });
  }
  async deleteGame(req, res) {
    let id_game = req.params.id;

    let isGameDeteled = await Game.deleteGame(id_game);

    console.log(`retorno: ${isGameDeteled}`);
    if (isGameDeteled) {
      res.status(200);
      res.send({ success: 'game deletado com sucesso' });
      return;
    }
    res.status(409);
    res.send({ err: 'falha ao deletar game' });
  }
}

module.exports = new GameController();
