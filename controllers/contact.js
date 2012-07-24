var Blog = require('../lib/blog');
var View = require('../lib/view');
var PageController = require('./page');

function ContactController() { 
  PageController.apply(this, arguments);
}
require('util').inherits(ContactController, PageController);

ContactController.prototype.actionIndex = function() {


};

module.exports = ContactController;