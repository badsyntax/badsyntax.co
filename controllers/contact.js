var BaseController = require('./base').Controller; 

function ContactController() {
  BaseController.apply(this, arguments);
};

require('util').inherits(ContactController, BaseController);

ContactController.prototype.actionIndex = function() {
  var Page = new (require('../lib/page'))('/contact');
  this.ViewModel = Page.ViewModel;
};

module.exports = ContactController;