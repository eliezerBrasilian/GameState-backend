let express = require('express');
let app = express();

let router = express.Router();
let HomeController = require('../controllers/HomeController');
let UserController = require('../controllers/UserController');
let UserAuth = require('../middleware/UserAuth');
router.get('/', HomeController.index);
router.post('/user', UserAuth, UserController.create);
router.post('/user/login', UserController.login);
module.exports = router;
