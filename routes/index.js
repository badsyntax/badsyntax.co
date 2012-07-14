var PostControler = require('../controllers/post');
var HomeControler = require('../controllers/home');
var ContactControler = require('../controllers/contact');

var Router = {
  setup: function(app) {

    app.get('/', function(req, res) {
      new HomeControler(app, req, res);
    });

    app.get('/contact', function(req, res) {
      new ContactControler(app, req, res);
    });

    app.get('/about', function(req, res) {
      new AboutController(app, req, res);
    });

    app.get('/post/:uri', function(req, res) {
      new PostControler(app, req, res);
    });
  }
};

module.exports = Router;