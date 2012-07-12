var PostControler = require('../controllers/post');
var HomeControler = require('../controllers/home');
var ContactControler = require('../controllers/contact');

var Router = {
  setup: function(app) {

    app.get('/', function(req, res) {
      new HomeControler(app, req, res, 'actionIndex');
    });

    app.get('/contact', function(req, res) {
      new ContactControler(app, req, res, 'actionIndex');
    });

    app.get('/post/:uri', function(req, res) {
      new PostControler(app, req, res, 'actionIndex');
    });
  }
};

module.exports = Router;