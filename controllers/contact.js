var BaseController = require('./base').Controller; 

function ContactController() {
  BaseController.apply(this, arguments);
};

require('util').inherits(ContactController, BaseController);

ContactController.prototype.actionIndex = function() {
  this.ViewModel = new (require('../lib/page'))('/contact').ViewModel;
};

module.exports = ContactController;