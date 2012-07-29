var Blog = require('../lib/blog');
var View = require('../lib/view');
var PageController = require('./page');

function BlogController() { 
  PageController.apply(this, arguments);
}
require('util').inherits(BlogController, PageController);

BlogController.prototype.actionIndex = function() {

  var page = this.req.query.page || 1;
  var blog = new Blog();

  var posts = blog.getPosts(page, 10);
  var tags = blog.getTags(null, 10);

  this.view.posts = posts;
  this.view.tags = tags;

  this.view.pagination = this.renderPagination(blog.pagination);
};

// Filter by tag
BlogController.prototype.actionTag = function() {

  // Show the blog page content
  this.req.route.contentUri = 'blog';

  var page = this.req.query.page || 1;
  var tag = this.req.params.id;
  var blog = new Blog();

  blog.filterByTag(tag);
  
  var posts = blog.getPosts(page, 10);
  var tags = blog.getTags(tag, 10);

  this.view.posts = posts;
  this.view.tags = tags;

  this.view.pagination = this.renderPagination(blog.pagination);
};

BlogController.prototype.renderPagination = function(pagination) {

  var paginationPages = pagination.pages();
  var prevPage = paginationPages[ pagination.page - 1 ];
  var nextPage = paginationPages[ paginationPages.length - 1 ];

  return new View('fragments/pagination.mustache', { 
    pages: paginationPages,
    lastPage: ( pagination.page + 1 === pagination.totalPages ),
    firstPage: ( pagination.page === 0),
    prevUrl: prevPage ? prevPage.url : null,
    nextUrl: nextPage.url
  }).render();
};

module.exports = BlogController;