let knex = require('../database/connection');
const fs = require('fs');
class User {
  async new(email, nome, senha) {
    try {
      await knex.insert({ email, nome, senha }).table('usuario_tb');
      console.log('inseriu');
    } catch (err) {
      console.log(err);
    }
  }
  async findEmail(email) {
    try {
      let q = await knex.select('*').from('usuario_tb').where({ email: email });
      return q.length > 0 ? true : false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async findByEmail(email) {
    try {
      var result = await knex
        .select('*')
        .where({ email: email })
        .table('usuario_tb');

      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
  async userData(id) {
    try {
      let q = await knex.select('*').from('usuario_tb').where({ id: id });
      console.log(q);
      return q.length > 0 ? true : false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async updateProfilePhoto(imagePath, id) {
    try {
      // const imageBinary = fs.readFileSync(imagePath);
      // const imageBase64 = imageBinary.toString('base64');
      // const imageBinary = await RNFS.readFile(imagePath, 'base64');
      // const imageBytes = Buffer.from(imageBinary, 'base64');

      await knex('usuario_tb')
        .update({ profile_photo: imagePath })
        .where({ id: id });

      console.log('Imagem atualizada no banco de dados com sucesso');
      return true;
    } catch (error) {
      console.log('Erro ao enviar a imagem para o banco de dados:', error);
      return false;
    }
  }
}

module.exports = new User();
