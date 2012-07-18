var Blog = require('../lib/blog');
var PageController = require('./page');

function BlogController() { 
  this.controllerName = 'Blog';
  PageController.apply(this, arguments);
}
require('util').inherits(BlogController, PageController);

BlogController.prototype.actionIndex = function() {

  var tag = this.req.params.tag;
  var page = this.req.params.page;
  var blog = new Blog();

  this.view.posts = blog.getPosts(page, tag, 10);
  this.view.tags = blog.getTags(tag, 10);

  this.view.pagination = this.renderView('fragments/pagination.mustache', { 
    pages: blog.getPaginationPages()
  });
};

module.exports = BlogController;