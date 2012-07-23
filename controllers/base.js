var DataStore = require('../lib/datastore');
var PageModel = require('../models/page');

function BaseController(app, req, res) {

  this.app = app;
  this.req = req;
  this.res = res;
  this.view = {};

  this.execute();
};

BaseController.prototype.execute = function() {

  var action = this.req.route.action || 'actionIndex';

  if (this[action] === undefined) {
    this.res.send(404);
    return;
  }

  this.before();
  this[action]();
  this.after();
};

BaseController.prototype.before = function(){};
BaseController.prototype.after = function(){};

module.exports = BaseController;