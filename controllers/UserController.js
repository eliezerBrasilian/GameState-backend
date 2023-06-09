let User = require('../models/User');
class UserController {
  async create(req, res) {
    let { email, nome, senha } = req.body;

    let emailExists = await User.findEmail(email);
    console.log(emailExists);
    if (emailExists) {
      res.status(401);
      res.json({ err: 'O email já está em uso!' });
      return;
    } else {
      await User.new(email, nome, senha);
      res.status(200);
      res.send({ success: 'dados inseridos' });
    }
  }
}

module.exports = new UserController();
