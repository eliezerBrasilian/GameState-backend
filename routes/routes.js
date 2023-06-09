let express = require('express');
let app = express();

let router = express.Router();
let HomeController = require('../controllers/HomeController');
let UserController = require('../controllers/UserController');
router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.post('/user/login', UserController.login);
module.exports = router;
