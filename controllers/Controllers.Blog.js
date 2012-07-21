var Blog = require('../lib/blog');
var View = require('../lib/view');
var PageController = require('./Controllers.Page');

function BlogController() { 
  PageController.apply(this, arguments);
}
require('util').inherits(BlogController, PageController);

BlogController.prototype.actionIndex = function() {

  var page = this.req.params.page;
  var blog = new Blog();

  var posts = blog.getPosts(page, 10);
  var tags = blog.getTags(null, 10);

  this.view.posts = posts;
  this.view.tags = tags;

  this.view.pagination = new View('fragments/pagination.mustache', { pages: blog.getPaginationPages() }).render();
};

// Filter by tag
BlogController.prototype.actionTag = function() {

  // Show the blog page content
  this.req.route.contentUri = 'blog';

  var page = this.req.params.page;
  var tag = this.req.params.id;
  var blog = new Blog();

  blog.filterByTag(tag);
  
  var posts = blog.getPosts(page, 10);
  var tags = blog.getTags(tag, 10);

  this.view.posts = posts;
  this.view.tags = tags;

  this.view.pagination = new View('fragments/pagination.mustache', { pages: blog.getPaginationPages() }).render();
};

module.exports = BlogController;