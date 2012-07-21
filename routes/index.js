var Router = {

  defaultController: 'page',
  defaultAction: 'index',

  route: function(app) {
    this.app = app;
    this.setupControllers();
    this.setupRedirects();
    this.setupRoutes();
  },

  setupControllers: function() {
    this.controllers = require('fs').readdirSync(__dirname + '/../controllers/');
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

    var action = req.params.action || this.defaultAction;
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

      var foundController = this.controllers.indexOf(req.route.controller + '.js') !== -1;
      var controllerName = foundController ? req.route.controller : this.defaultController;
      var controller = require('../controllers/' + controllerName);

      new controller(this.app, req, res);

    }.bind(this);
  },

  setupRoutes: function() {
    
    var app = this.app;

    app.get('/post/:uri', this.routeRequest({ 'controller': 'post' }));
    app.get('/:controller?/:action?/:id?', this.routeRequest());
  }
};

module.exports = Router;