var DataStore = require('../lib/datastore');
var PageModel = require('../models/page');

function BaseController(app, req, res) {

  this.app = app;
  this.req = req;
  this.res = res;
  this.view = {};

  this.before();
  this[this.req.route.action || 'actionIndex']();
  this.after();
};

BaseController.prototype = {
  before: function() {},
  after: function() {}
};

module.exports = BaseController;