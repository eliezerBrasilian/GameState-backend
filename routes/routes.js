let express = require('express');

let router = express.Router();
let HomeController = require('../controllers/HomeController');
let UserController = require('../controllers/UserController');
let UserAuth = require('../middleware/UserAuth');
let GameController = require('../controllers/GameController');
router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.post('/user/login', UserController.login);
router.get('/me', UserController.userData);
router.get('/games/:id', UserAuth, GameController.listGames);
router.post('/game', UserAuth, GameController.saveGame);
router.post('/game/:id', UserAuth, GameController.deleteGame);

module.exports = router;
