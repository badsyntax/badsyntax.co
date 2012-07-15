var DataStore = require('../lib/datastore');
var Pagination = require('../lib/pagination');
var PostModel = require('../models/post');
var PageController = require('./page');

function BlogController() { 
  this.controllerName = 'Blog';
  PageController.apply(this, arguments);
};
require('util').inherits(BlogController, PageController);

BlogController.prototype.actionIndex = function() {

  var posts = new DataStore('posts');

  var pagination = new Pagination({
    page: this.req.params.page || 1, 
    amount: 10,
    total: posts.data.length,
    url: '/blog'
  });

  posts.limit(pagination.start, pagination.end);

  posts = posts.findAll().map(function(data){
    return new PostModel(data);
  });

  this.view.posts = posts;

  this.view.pagination = this.renderView('fragments/pagination.mustache', { 
    pages: pagination.pages()
  });
};

module.exports = BlogController;