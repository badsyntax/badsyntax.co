var Router = {
  
  init: function(app) {
    this.app = app;
    this.setupRedirects();
    this.setupRoutes();
  },

  setupRedirects: function() {

    var app = this.app;

    (function(redirects){
      
      for(var redirect in redirects) {
        
        (function(from, to) {

          app.get(from, function(req, res) { res.redirect(to, 301); });
        
        })(redirect, redirects[redirect]);
      }
    })( require('./redirects') );
  },

  setupRoutes: function() {
    
    var app = this.app;
    var PostController = require('../controllers/post');
    var PageController = require('../controllers/page');
    var BlogController = require('../controllers/blog');

    app.get('/', function(req, res) {
      new PageController(app, req, res);
    });

    app.get('/blog/:page', function(req, res) {
      req.url = '/blog';
      new BlogController(app, req, res);
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