var BaseViewModel = require('../base');

function HomeIndexViewModel() {
  BaseViewModel.apply(this, arguments);
  this.view = 'home/index';
}

require('util').inherits(HomeIndexViewModel, BaseViewModel);

HomeIndexViewModel.prototype.var_test = function() {
  return 'Hello there, I am a test variable method';
};

exports = module.exports = HomeIndexViewModel;