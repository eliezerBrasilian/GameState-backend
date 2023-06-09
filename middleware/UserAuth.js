var jwt = require('jsonwebtoken');
let secret = 'hdudidhd8383bdbdbdbd';
module.exports = function (req, res, next) {
  const authToken = req.headers['authorization'];

  if (authToken != undefined) {
    const bearer = authToken.split(' ');
    var token = bearer[1];
    console.log(token);

    try {
      var decoded = jwt.verify(token, secret);
      console.log(decoded);
      res.status(200);
      //   res.send('Voce esta logado entao tem permissao!');
      next();
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
};
