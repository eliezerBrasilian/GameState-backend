let Console = require('../models/Console');

class ConsoleController {
  async listConsoles(req, res) {
    let consoles = await Console.listConsoles();
    res.status(200);
    res.send({ consoles: consoles });
  }
}

module.exports = new ConsoleController();
