var DataStore = require('../lib/datastore');
var PostModel = require('../models/post');
var PageController = require('./Controllers.Page');

function PostController() {
  this.controllerName = 'Post';
  PageController.apply(this, arguments);
}
require('util').inherits(PostController, PageController);

PostController.prototype.actionIndex = function() {

  var uri = this.req.url.replace('/', '');

  // Load the post record
  var postRecord = new DataStore('posts').where(function(post){
    return post.uri == uri;
  }).find()[0];

  // Load the post model
  this.page = new PostModel( postRecord );

  // Update breadcrumbs
  this.breadcrumbs.push({
    url: '/blog',
    title: 'Blog'
  });
};

module.exports = PostController;