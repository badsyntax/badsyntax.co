exports.setup = function(app) {

  var route = function(config) {

    var controller = require('../controllers/' + config.controller);
    var action = config.action || 'index';

    action = 'action' + action.charAt(0).toUpperCase() + action.slice(1);

    if (controller.prototype[action] === undefined) {
      throw new Error('Controller action does not exist: ' + action + '; on controller: ' + config.controller);
    }

    return function(req, res) {
      return new controller(app, req, res, action);
    }
  };

  app.get('/', route({ controller: 'home', action: 'index' }));
  app.get('/contact', route({ controller: 'contact', action: 'index' }));
};