var DataStore = require('../lib/datastore');
var PageModel = require('../models/page');
var PostModel = require('../models/post');
var BaseController = require('./base').Controller;

function HomeController() { BaseController.apply(this, arguments); };
require('util').inherits(HomeController, BaseController);

HomeController.prototype.actionIndex = function() {

  // Load the page model
  var Page = new PageModel( new DataStore('pages').get('/') );

  // Load the post models
  var posts = new DataStore('posts').get().map(function(data){
    return new PostModel(data);
  });

  // Render the view
  this.res.render(Page.data.view, {
    page: Page.data,
    posts: posts
  });
};

module.exports = HomeController;