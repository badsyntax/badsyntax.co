var Validator = require('../lib/validator');
var PageController = require('./page');
var nodemailer = require("nodemailer");

function ContactController() { 
  PageController.apply(this, arguments);
}
require('util').inherits(ContactController, PageController);

ContactController.prototype.actionPost = function() {

  var data = {
    name: this.req.param('name'),
    email: this.req.param('email'),
    message: this.req.param('message')
  };

  var validator = new Validator(data);

  validator.rule('name', function(val) {
    return val.length > 0;
  }, '- must not be empty');

  validator.rule('email', function(val) {
    return val.length > 0;
  }, '- must not be empty');

  validator.rule('email', function(val) {
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( val );
  }, '- must be a valid email');
  
  validator.rule('message', function(val) {
    return val.length > 0;
  }, '- must not be empty');

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