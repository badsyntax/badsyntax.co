var DataStore = require('../lib/datastore');
var PostModel = require('../models/post');
var BaseController = require('./base').Controller;

function PostController() { BaseController.apply(this, arguments); }
require('util').inherits(PostController, BaseController);

/** 
 * Post controller
 * Show single posts as pages
 */
PostController.prototype.actionIndex = function() {

  // Load the post model
  var Post = new PostModel( new DataStore('posts').get(this.req.params.uri) );

  // Render the view
  this.res.render('page/post', Post);
};

module.exports = PostController;