var DataStore = require('../lib/datastore');
var PostModel = require('../models/post');
var PageController = require('./page');

function HomeController() { 
  this.pageUri = '';
  PageController.apply(this, arguments); 
};
require('util').inherits(HomeController, PageController);

HomeController.prototype.actionIndex = function() {
  // Load the post models
  this.view.posts = new DataStore('posts').findAll().map(function(data){
    return new PostModel(data);
  });
};

module.exports = HomeController;