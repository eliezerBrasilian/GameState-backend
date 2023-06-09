const cloudinary = require('cloudinary').v2;
const multer = require('multer');
require('dotenv').config();
const { cloudName, apiKey, apiSecret } = process.env;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const upload = multer({
  dest: 'temp',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
}).single('capa');

module.exports = function uploadImage(req, res, next) {
  upload(req, res, async function (error) {
    if (error) {
      console.error('Erro no upload do arquivo:', error);
      res.status(500).send('Erro no upload do arquivo');
    } else {
      const capa = req.file;
      console.log(capa);

      await cloudinary.uploader.upload(capa.path, (error, result) => {
        if (error) {
          console.error('Erro no upload para o Cloudinary:', error);
          res.status(500).send('Erro no upload da imagem');
        } else {
          const imageUrl = result.secure_url;
          req.imageUrl = imageUrl;
          console.log('IMAGEM DEVOLVIDA FROM CLOUDINARY: ' + imageUrl);
          next();
        }
      });
    }
  });
};
