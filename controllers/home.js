var BaseController = require('./base').Controller;

function HomeController() {
	BaseController.apply(this, arguments);
};

require('util').inherits(HomeController, BaseController);

HomeController.prototype.actionIndex = function() {
  var Page = new (require('../lib/page'))('/');
  this.ViewModel = Page.ViewModel;
};

module.exports = HomeController;