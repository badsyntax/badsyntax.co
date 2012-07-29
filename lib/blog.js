var Pagination = require('./pagination');
var DataStore = require('./datastore');
var PostModel = require('../models/post');
var TagModel = require('../models/tag');

function Blog() {
  this.posts = new DataStore('posts');
}

Blog.prototype.filterByTag = function(tag) {
  if (tag) {
    this.posts.where(function(post) {
      return ( post.tags.indexOf(tag) > -1 );
    });
  }
};

Blog.prototype.paginate = function(page, amount) {
 
  this.pagination = new Pagination({
    page: page || 1, 
    amount: amount,
    total: this.posts.find().length,
    url: '/blog'
  });

  this.posts.limit(this.pagination.start, this.pagination.end);
};

Blog.prototype.mapModels = function() {
  this.posts = this.posts.find().map(function(post){
    post.tagModels = post.tags.map(function(tag){
      return new TagModel({ name: tag });
    });
    return new PostModel(post);
  });
}

Blog.prototype.getPosts = function(page, amount) {

  this.paginate(page, amount);
  this.mapModels();

  return this.posts;
};

Blog.prototype.getTags = function(currentTag, amount) {

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

  sortedTags = sortedTags.slice(0, amount).map(function(data){
    data.active = (currentTag === data.name);
    return new TagModel(data);
  });

  return sortedTags;
};

module.exports = exports = Blog;