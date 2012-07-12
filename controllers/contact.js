var BaseController = require('./base').Controller; 

function ContactController() {
  BaseController.apply(this, arguments);
};

require('util').inherits(ContactController, BaseController);

ContactController.prototype.actionIndex = function() {

  // Load the page data
  var Page = new (require('../lib/page'))('/contact');

  // Render the view
  this.res.render(Page.data.view, Page.data);
};

module.exports = ContactController;