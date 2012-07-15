var App = App || {};

App.inherits = function(_sub, _super) {

  function F() {};
  F.prototype = _super;

  _sub.prototype = new F();
  _sub.prototype.constructor = _sub;
};

App.Config = {
  disqus: {
    disqus_developer: 1,
    disqus_shortname: 'badsyntax'
  }
}; 

/* App Controllers */
App.Controllers = {};

/* Base controller */
App.Controllers.Base = function() {}

/* Page controller */
App.Controllers.Page = function() {

  App.Controllers.Base.apply(this, arguments);

  this.initPlugins();
}
App.inherits(App.Controllers.Page, App.Controllers.Base);

App.Controllers.Page.prototype.initPlugins = function() {};

/* Blog controller */
App.Controllers.Blog = function() {
  
  App.Controllers.Page.apply(this, arguments);

  this.getElements();
  this.bindEvents();
};

App.inherits(App.Controllers.Blog, App.Controllers.Page)

App.Controllers.Blog.prototype.initPlugins = function() {

  App.Controllers.Page.prototype.initPlugins.apply(this, arguments);
  
  prettyPrint();

  /* Disqus comments count */
  (function(w,p,o) {
    for(var k in o) w[k] = o[k];
    var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
    s.src = 'http://' + disqus_shortname + '.disqus.com/count.js';
    p.appendChild(s);
  })(window, document.getElementsByTagName('head')[0], App.Config.disqus);
};

App.Controllers.Blog.prototype.getElements = function() {
  this.posts = $('.post');
  this.expandButton = $('#posts-expand');
  this.collapseButton = $('#posts-collapse');
};

App.Controllers.Blog.prototype.bindEvents = function() {
  this.collapseButton.on('click', $.proxy(this.collapsePosts, this));
  this.expandButton.on('click', $.proxy(this.expandPosts, this));
};

App.Controllers.Blog.prototype.expandPosts = function() {
  this.posts.find('.body').show();
};

App.Controllers.Blog.prototype.collapsePosts = function() {
  this.posts.find('.body').hide();
};

/* Post controller */
App.Controllers.Post = function() {
  App.Controllers.Page.apply(this, arguments);
};

App.inherits(App.Controllers.Post, App.Controllers.Page)

App.Controllers.Post.prototype.initPlugins = function() {

  App.Controllers.Page.prototype.initPlugins.apply(this, arguments);
  
  prettyPrint();

  /* Disqus comments embed */
  (function(w,p,o) {
    for(var k in o) w[k] = o[k];
    var c = document.createElement('script'); c.type = 'text/javascript'; c.async = true;
    c.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
    p.appendChild(c);
  })(window, (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]), App.Config.disqus);
};