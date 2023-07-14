let User = require('../models/User');
var jwt = require('jsonwebtoken');
let secret = 'hdudidhd8383bdbdbdbd';

class UserController {
  async create(req, res) {
    let { email, name, password, username } = req.body;
    console.log('email: ' + email);
    let emailExists = await User.findEmail(email);
    const usernameExists = await User.findUsername(username);

    if (emailExists) {
      res.status(401);
      res.json({ err: 'O email já está em uso!' });
      return;
    } else if (usernameExists) {
      res.status(401);
      res.json({ err: 'O username já está em uso!' });
      return;
    } else {
      //verificar se os dados estao vazios antes
      if (
        name !== undefined &&
        email !== undefined &&
        password !== undefined &&
        username !== undefined
      ) {
        console.log('name: ' + name);
        await User.new(email, name, password, username);
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
          name: decoded.name,
          isPremium: decoded.isPremium,
          username: decoded.username,
          profilePhoto: decoded.profilePhoto,
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
    var { email, password } = req.body;
    var user = await User.findByEmail(email);

    if (user != undefined) {
      //var resultado = await bcrypt.compare(password,user.password);

      var resultado = await String(password).localeCompare(String(user.senha));

      console.log(
        `passwords: ${String(password)} = ${String(
          user.senha
        )} - resultado: ${resultado}`
      );

      if (resultado === 0) {
        var token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            name: user.nome,
            isPremium: user.ispremium,
            username: user.username,
            profilePhoto: user.profile_photo,
          },
          secret
        );

        res.status(200);
        res.json({
          token: token,
          id: user.id,
          email: user.email,
          name: user.name,
          isPremium: user.isPremium,
          username: user.username,
          profilePhoto: user.profile_photo,
        });
      } else {
        res.status(406).json({ err: 'password incorreta' });
      }
    } else {
      res.status(404);
      res.json({ err: 'email invalido' });
    }
  }
  async getProfilePhoto(req, res) {
    let { id } = req.params;

    let gotImage = await User.getProfilePhoto(id);
    console.log(gotImage);
    if (gotImage) {
      res.status(200).json({ profilePhoto: gotImage });
    } else {
      res.status(400).send('imagem de perfil não encontrada');
    }
  }
  async updateProfilePhoto(req, res) {
    let { user_id } = req.body;
    const image = req.imageUrl;

    let isUpdated = User.updateProfilePhoto(image, user_id);
    isUpdated
      ? res.status(200).json({ success: image })
      : res.status(401).send('não foi possivel atualizar imagem!');
  }
  async updateUsername(req, res) {
    const { user_id, username } = req.body;
    const usernameExists = await User.findUsername(username);
    if (usernameExists) {
      res.status(401).send('Este username já está em uso!');
      return;
    }
    const isUpdated = User.updateUsername(username, user_id);
    isUpdated
      ? res.status(200).send('username atualizado com sucesso!')
      : res.status(401).send('não foi possivel atualizar username!');
  }
  async getUsername(req, res) {
    let { id } = req.params;

    let gotUsername = await User.getUsername(id);

    if (gotUsername != null) {
      res.status(200).json({ username: gotUsername });
    } else {
      res.status(400).send('imagem de perfil não encontrada');
    }
  }
}

module.exports = new UserController();
