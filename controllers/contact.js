var Validator = require('../lib/validator');
var PageController = require('./page');
var nodemailer = require("nodemailer");

function ContactController() { 
  PageController.apply(this, arguments);
}
require('util').inherits(ContactController, PageController);

ContactController.prototype.actionPost = function() {

	var spam = this.req.param('surname');

	if (spam) return;

  var data = {
    name: this.req.param('name'),
    email: this.req.param('email'),
    message: this.req.param('message')
  };

  var validator = new Validator(data);

  validator.rule('name', 'notEmpty', '- must not be empty');
  validator.rule('email', 'notEmpty', '- must not be empty');
  validator.rule('email', 'isEmail', '- must be a valid email');
  validator.rule('message', 'notEmpty', '- must not be empty');

  var errors = validator.check();

  if (errors) {
    this.view.message = {
      type: 'error',
      friendlytype: 'Error',
      content: 'Please correct the fields below.'
    };
  } else {
    this.sendEmail(data);
    data = {};
    this.view.message = {
      type: 'success',
      friendlytype: 'Success',
      content: 'Message successfully sent.'
    };
  }

  this.view.errors = errors;
  this.view.data = data;
};

ContactController.prototype.sendEmail = function(data) {

  var transport = nodemailer.createTransport("Sendmail");

  var mailOptions = {
      from: 'root@badsyntax.co',
      to: "willis.rh@gmail.com",
      subject: "New message from badsyntax.co", 
      text: 'From: ' + data.name + "\rEmail: " + data.email + "\rMessage: " + data.message
  };

  transport.sendMail(mailOptions);
}
module.exports = ContactController;
