class HomeController {
  async index(req, res) {
    res.send('GAME STATE');
  }
}

module.exports = new HomeController();
