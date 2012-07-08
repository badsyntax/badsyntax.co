var BaseController = require('./base').Controller;

function HomeController() {
	BaseController.apply(this, arguments);
};

require('util').inherits(HomeController, BaseController);

HomeController.prototype.actionIndex = function() {
  this.ViewModel = new (require('../lib/page'))('/').ViewModel;
};

module.exports = HomeController;