var PostController = require('../controllers/post');
var PageController = require('../controllers/page');
var BlogController = require('../controllers/blog');

var Router = {
  setup: function(app) {

    app.get('/', function(req, res) {
      new PageController(app, req, res);
    });
 
    app.get('/blog', function(req, res) {
      new BlogController(app, req, res);
    });

    app.get('/post/:uri', function(req, res) {
      new PostController(app, req, res);
    });
    
    app.get('/:uri', function(req, res) {
      new PageController(app, req, res);
    });
  }
};

module.exports = Router;