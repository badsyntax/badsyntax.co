var Router = {

  defaultController: 'page',
  defaultAction: 'index',
  cacheRequests: true,
  cache: {},

  route: function(app) {
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

    var action = req.params.action || this.defaultAction;
    action = 'action' + action.charAt(0).toUpperCase() + action.slice(1);

    return {
      controller: controller,
      action: action
    }
  },

  cacheRequest: function(req, res) {

    if (!this.cacheRequests || req.method !== 'GET') {
      return false;
    }

    // Find the request entry in the cache
    var cacheEntry = this.cache[req.url];
    if (cacheEntry) {
      res.send(cacheEntry.body, cacheEntry.headers, cacheEntry.status);
      return true;
    }

    // Cache the request
    var send = res.send;
    res.send = function(body, headers, status){
      this.cache[req.url] = {
        body: body,
        headers: headers,
        status: status
      };
      send.apply(res, arguments);
    }.bind(this);

    return false;
  },

  clearCache: function() {
    this.cache = {};
    require.cache = {};
  },

  routeRequest: function(route) {

    return function(req, res) {

      if (this.cacheRequest(req, res)) {
        return;
      }      

      req.route = route || this.getRouteFromRequest(req);

      if (!req.route) {
        return res.send(404);
      }

      var controllers = require('fs').readdirSync(__dirname + '/../controllers/');
      var foundController = controllers.indexOf(req.route.controller + '.js') !== -1;
      var controllerName = foundController ? req.route.controller : this.defaultController;
      var controller = require('../controllers/' + controllerName);

      req.route.controller = controllerName;

      new controller(this.app, req, res);

    }.bind(this);
  },

  setupRoutes: function() {
    
    var app = this.app;

    app.get('/*', function(req, res, next) {
      if (req.query && req.query.recache !== undefined) {
        this.clearCache();
      }
      next();
    }.bind(this));

    app.get('/post/:uri', this.routeRequest({ 'controller': 'post' }));
    app.get('/:controller?/:action?/:id?', this.routeRequest());

    app.post('/contact', this.routeRequest({ 'controller': 'contact', action: 'actionPost' }));
  }
};

module.exports = Router;