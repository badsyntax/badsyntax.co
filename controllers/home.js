var Blog = require('../lib/blog');
var PageController = require('./page');

function HomeController() { PageController.apply(this, arguments); }
require('util').inherits(HomeController, PageController);

HomeController.prototype.actionIndex = function() {
  this.view.posts = new Blog().getPosts(1, 5);
};

module.exports = HomeController;