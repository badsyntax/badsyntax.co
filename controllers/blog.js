var DataStore = require('../lib/datastore');
var Pagination = require('../lib/pagination');
var PostModel = require('../models/post');
var TagModel = require('../models/tag');
var PageController = require('./page');

function BlogController() { 
  this.controllerName = 'Blog';
  PageController.apply(this, arguments);
};
require('util').inherits(BlogController, PageController);

BlogController.prototype.actionIndex = function() {

  /* This should probably go into a blog lib */

  var posts = new DataStore('posts');

  // Filter by tag
  if (this.req.params.tag) {
    posts.where(function(post) {
      return ( post.tags.indexOf(this.req.params.tag) > -1 );
    }.bind(this));
  }

  var pagination = new Pagination({
    page: this.req.params.page || 1, 
    amount: 10,
    total: posts.find().length,
    url: '/blog'
  });

  posts.limit(pagination.start, pagination.end);


  posts = posts.find().map(function(data){
    data.tagModels = data.tags.map(function(tag){
      return new TagModel({ name: tag });
    });
    return new PostModel(data);
  });

  this.view.posts = posts;

  var tags = {};
  new DataStore('posts').find().forEach(function(post){
    
    for(var i = 0, l = post.tags.length; i < l; i++) {
      
      var tag = post.tags[i];
      
      if (!tags[tag]) {
        tags[tag] = 0;
      }
      
      tags[tag]++;
    }
  });

  var sortedTags = [];
  for (var tag in tags) {
    sortedTags.push({
      name: tag, 
      count: tags[tag]
    });
  }
  sortedTags.sort(function(a, b) {
    return b.count - a.count; 
  });
  sortedTags = sortedTags.slice(0, 10).map(function(data){
    data.active = (this.req.params.tag === data.name);
    return new TagModel(data);
  }.bind(this));

  this.view.tags = sortedTags;

  this.view.pagination = this.renderView('fragments/pagination.mustache', { 
    pages: pagination.pages()
  });
};

module.exports = BlogController;