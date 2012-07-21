var Router = {
  
  init: function(app) {
    this.app = app;
    this.setupRedirects();
    this.setupRoutes();
  },

  setupRedirects: function() {

    var redirects = require('./redirects');

    for(var redirect in redirects) {
      
      (function(app, from, to) {

        app.get(from, function(req, res) { res.redirect(to, 301); });
      
      })(this.app, redirect, redirects[redirect]);
    }
  },

  getRouteFromRequest: function(req) {

    if (!req.params) {
      return null;
    }

    var controller = req.params.controller || '';
    controller = controller.charAt(0).toUpperCase() + controller.slice(1);

    var action = req.params.action || 'index';
    action = 'action' + action.charAt(0).toUpperCase() + action.slice(1);

    return {
      controller: controller,
      action: action
    }
  },

  routeRequest: function(route) {


    return function(req, res) {

      req.route = route || this.getRouteFromRequest(req);

      if (!req.route) {
        return res.send(404);
      }

      var controller;

      // try {
        controller = require('../controllers/Controllers.' + req.route.controller);
      // } catch(e) {
        // If we don't have a specific controller to serve this request, then 
        // revert to using the generic page controller for catch-all page requests.
        // controller = require('../controllers/Controllers.Page');
      // }

      console.log(controller);

      

      new controller(this.app, req, res);

    }.bind(this);
  },

  setupRoutes: function() {
    
    var app = this.app;

    // app.get('/', function(req, res) {
    //   new PageController(app, req, res);
    // });

    // app.get('/blog/tag/:tag', this.routeRequest({
    //   controller: 'BlogController',
    //   action: 'actionIndex',
    //   contentUri: 'blog'
    // }));

    //function(req, res) {
    //  req.url = '/blog'; // show the blog page
      //new BlogController(app, req, res);
    //});

    // app.get('/blog/tag/:tag', function(req, res) {
    //   req.url = '/blog'; // show the blog page
    //   new BlogController(app, req, res);
    // });

    //app.get('/blog/:page', function(req, res) {
    //  req.url = '/blog'; // show the blog page
    //  new BlogController(app, req, res);
    //});
 
    // app.get('/blog', function(req, res) {
    //   new BlogController(app, req, res);
    // });

    // app.get('/post/:uri', function(req, res) {
    //   new PostController(app, req, res);
    // });
    
    // app.get('/:uri', function(req, res) {
    //   new PageController(app, req, res);
    // });

    app.get('/post/:uri', this.routeRequest({
      'controller': 'Post',
      'action': 'actionIndex'
    }));

    app.get('/:controller?/:action?/:id?', this.routeRequest());
  }
};

module.exports = Router;