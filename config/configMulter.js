const multer = require('multer');
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    let nome = Date.now() + '-' + file.originalname;
    callback(null, nome);
  },
  destination: function (req, file, callback) {
    let path = '/public/images';
    callback(null, path);
  },
});

const upload = multer({ storage });
module.exports = upload;
