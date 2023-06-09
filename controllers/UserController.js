let User = require('../models/User');
var jwt = require('jsonwebtoken');
let secret = 'hdudidhd8383bdbdbdbd';
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
      //verificar se os dados estao vazios antes
      if (nome !== undefined && email !== undefined && senha !== undefined) {
        console.log('nome: ' + nome);
        await User.new(email, nome, senha);
        res.status(200);
        res.send({ success: 'dados inseridos' });
      } else {
        res.status(403);
        res.send({ err: 'algum dado está faltando' });
      }
    }
  }
  async login(req, res) {
    var { email, senha } = req.body;

    var user = await User.findByEmail(email);

    if (user != undefined) {
      //var resultado = await bcrypt.compare(password,user.password);
      var resultado = await String(senha).localeCompare(String(user.senha));
      console.log(
        `senhas: ${String(senha)} : ${String(
          user.senha
        )} - resultado: ${resultado}`
      );

      if (resultado === 0) {
        var token = jwt.sign(
          { email: user.email, nome: user.nome, isPremium: user.isPremium },
          secret
        );

        res.status(200);
        res.json({ token: token });
      } else {
        res.status(406);
        res.send('Senha incorreta');
      }
    } else {
      res.json({ status: false });
    }
  }
}

module.exports = new UserController();
