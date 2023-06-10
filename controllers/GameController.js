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
}

module.exports = new GameController();
