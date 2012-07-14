var DataStore = require('../lib/datastore');
var PostModel = require('../models/post');
var PageController = require('./page');

function PostController() { PageController.apply(this, arguments); }
require('util').inherits(PostController, PageController);

PostController.prototype.actionIndex = function() {

  // Load the post record
  var postRecord = new DataStore('posts').findRecord('uri', this.req.params.uri);

  // Load the post model
  this.page = new PostModel( postRecord );
};

module.exports = PostController;