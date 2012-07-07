var BaseController = require('./base').Controller;

function HomeController() {
	BaseController.apply(this, arguments);
};

require('util').inherits(HomeController, BaseController);

HomeController.prototype.actionIndex = function() {

  var ViewModel = new (require('../viewmodels/home/index'));

  ViewModel.set('title', 'Home');

  this.ViewModel = ViewModel;
};

module.exports = HomeController;