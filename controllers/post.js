var Blog = require('../lib/blog');
var PageController = require('./page');

function PostController() { PageController.apply(this, arguments); }
require('util').inherits(PostController, PageController);

PostController.prototype.actionIndex = function() {

  var uri = this.req.url
    .replace(/^\//, '')
    .replace(/\?.*$/, '');

  this.page = (new Blog).getPost(uri);

  this.breadcrumbs.push({
    url: '/blog',
    title: 'Blog'
  });
};

module.exports = PostController;
