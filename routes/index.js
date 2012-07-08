var Router = { app: null };

Router.route = function(config) {

  var controller = require('../controllers/' + config.controller);
  var action = config.action || 'index';

  action = 'action' + action.charAt(0).toUpperCase() + action.slice(1);

  if (controller.prototype[action] === undefined) {
    throw new Error('Controller action does not exist: ' + action + '; on controller: ' + config.controller);
  }

  return function(req, res) {
    return new controller(this.app, req, res, action);
  }.bind(this);
};

Router.setup = function(app) {
  
  this.app = app;

  app.get('/', this.route({ controller: 'home', action: 'index' }));
  app.get('/contact', this.route({ controller: 'contact', action: 'index' }));
};

module.exports = Router;