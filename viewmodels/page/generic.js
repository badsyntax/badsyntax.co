var BaseViewModel = require('../base');

function PageGenericViewModel() {
  BaseViewModel.apply(this, arguments);
  this.view = 'page/generic';
}

require('util').inherits(PageGenericViewModel, BaseViewModel);

exports = module.exports = PageGenericViewModel;