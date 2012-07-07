var BaseController = require('./base').Controller; 

function ContactController() {
  BaseController.apply(this, arguments);
};

require('util').inherits(ContactController, BaseController);

ContactController.prototype.actionIndex = function(req, res) {
  res.render('contact', { title: 'Contact' });
};

module.exports = ContactController;