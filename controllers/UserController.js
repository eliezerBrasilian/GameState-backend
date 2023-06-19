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
  async userData(req, res) {
    const authToken = req.headers['authorization'];
    if (authToken != undefined) {
      console.log('Token veio');
      console.log(authToken);
      const bearer = authToken.split(' ');
      var token = bearer[1];
      console.log(token);

      try {
        var decoded = jwt.verify(token, secret);
        console.log(decoded);
        res.status(200);

        res.json({
          token: token,
          id: decoded.id,
          email: decoded.email,
          nome: decoded.nome,
          isPremium: decoded.isPremium,
          username: decoded.username,
        });
      } catch (err) {
        res.status(403);
        res.send('Você não está autenticado');
        return;
      }
    } else {
      res.status(403);
      res.send('Você não está autenticado');
      return;
    }
  }
  async login(req, res) {
    var { email, senha } = req.body;
    console.log(req.body.email);

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
          {
            id: user.id,
            email: user.email,
            nome: user.nome,
            isPremium: user.isPremium,
            username: user.username,
          },
          secret
        );

        res.status(200);
        res.json({
          token: token,
          id: user.id,
          email: user.email,
          nome: user.nome,
          isPremium: user.isPremium,
          username: user.username,
        });
      } else {
        res.status(406);
        res.send('Senha incorreta');
      }
    } else {
      res.json({ err: false });
    }
  }
}

module.exports = new UserController();
