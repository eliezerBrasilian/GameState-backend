let express = require('express');

let router = express.Router();
let HomeController = require('../controllers/HomeController');
let UserController = require('../controllers/UserController');
let UserAuth = require('../middleware/UserAuth');
let GameController = require('../controllers/GameController');
let ConsoleController = require('../controllers/ConsoleController');
const uploadConfig = require('../config/configMulter');
const UploadImage = require('../middleware/UploadImage');

router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.post('/user/login', UserController.login);
router.get('/me', UserController.userData);
router.post(
  '/user/profile/photo',
  UserAuth,
  UploadImage,
  UserController.updateProfilePhoto
);
router.get('/user/:id/profile/photo', UserController.getProfilePhoto);
router.get('/games/:id/:page', UserAuth, GameController.listGames);
router.post('/game', UploadImage, GameController.saveGame);
router.post('/game/:id', UserAuth, GameController.deleteGame);
router.post('/edit/game', UserAuth, UploadImage, GameController.editGame);
router.get('/consoles', ConsoleController.listConsoles);

module.exports = router;
