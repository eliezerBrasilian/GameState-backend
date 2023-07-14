let knex = require('../database/connection');
const fs = require('fs');
class User {
  async new(email, nome, senha, username) {
    try {
      await knex.insert({ email, nome, senha, username }).table('usuario_tb');
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
        console.log(result[0]);
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

  async getProfilePhoto(id) {
    try {
      let q = await knex
        .select('profile_photo')
        .from('usuario_tb')
        .where({ id: id });
      console.log(q);
      return q.length > 0 ? q : null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async updateProfilePhoto(imagePath, id) {
    try {
      let result;
      await knex('usuario_tb')
        .update({ profile_photo: imagePath })
        .where({ id: id })
        .then((r) => {
          console.log('success' + r);
          result = true;
        })
        .catch((e) => {
          console.log(e);
          result = false;
        });

      console.log('Imagem atualizada no banco de dados com sucesso');
      return result;
    } catch (error) {
      console.log('Erro ao enviar a imagem para o banco de dados:', error);
      return result;
    }
  }
  async findUsername(username) {
    try {
      let q = await knex
        .select('*')
        .from('usuario_tb')
        .where({ username: username });
      return q.length > 0 ? true : false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async updateUsername(username, user_id) {
    try {
      let result;
      await knex('usuario_tb')
        .update({ username: username })
        .where({ id: user_id })
        .then((r) => {
          console.log('success' + r);
          result = true;
        })
        .catch((e) => {
          console.log(e);
          result = false;
        });

      console.log('Username atualizada no banco de dados com sucesso');
      return result;
    } catch (error) {
      console.log('Erro ao atualizar username: ', error);
      return result;
    }
  }
  async getUsername(id) {
    try {
      let q = await knex
        .select('username')
        .from('usuario_tb')
        .where({ id: id });

      console.log(q);
      return q.length > 0 ? q : null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

module.exports = new User();
