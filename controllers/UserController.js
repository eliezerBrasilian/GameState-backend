let User = require('../models/User');
class UserController {
  async create(req, res) {
    let { email, nome, senha } = req.body;

    await User.new(email, nome, senha);
    res.status(200);
    res.send('dados inseridos');
  }
}

module.exports = new UserController();
