var BaseController = require('./base').Controller;

function HomeController() { BaseController.apply(this, arguments); };
require('util').inherits(HomeController, BaseController);

HomeController.prototype.actionIndex = function() {

  // Load the page data
  var Page = new (require('../lib/page'))('/');

  // Render the view
  this.res.render(Page.data.view, Page.data);
};

module.exports = HomeController;