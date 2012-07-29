var App = App || {};

/**********************
 * App config
 **********************/
App.Config = {
  disqus: {
    disqus_developer: 1, // TODO
    disqus_shortname: 'badsyntax'
  }
};

/**********************
 * App util
 **********************/
App.Util = {};
App.Util.inherits = function(_sub, _super) {

  function F() {};
  F.prototype = _super.prototype;

  _sub.prototype = new F();
  _sub.prototype.constructor = _sub;
}; 

/**********************
 * Base controllers
 **********************/
App.Controllers = {};
App.Controllers.Base = function(config) {
  this.config = config;
};

/**********************
 * Page controller
 **********************/
App.Controllers.Page = function() {

  App.Controllers.Base.apply(this, arguments);

  this.initTracking();
  this.initPlugins();
}
App.Util.inherits(App.Controllers.Page, App.Controllers.Base);

App.Controllers.Page.prototype.initTracking = function() {

  if (!this.config.trackPage) {
    return;
  }

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-1636725-27']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
};

App.Controllers.Page.prototype.initPlugins = function() {};

/**********************
 * Blog controller
 **********************/
App.Controllers.Blog = function() {
  
  App.Controllers.Page.apply(this, arguments);

  this.getElements();
  this.bindEvents();
};

App.Util.inherits(App.Controllers.Blog, App.Controllers.Page);

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
  this.collapseButton.on('click', $.proxy(this, 'collapsePosts'));
  this.expandButton.on('click', $.proxy(this, 'expandPosts'));
};

App.Controllers.Blog.prototype.expandPosts = function() {
  this.posts.find('.body').show();
};

App.Controllers.Blog.prototype.collapsePosts = function() {
  this.posts.find('.body').hide();
};

/**********************
 * Post controller
 **********************/
App.Controllers.Post = function() {

  App.Controllers.Page.apply(this, arguments);
  this.bindEvents();

  if (window.location.hash.indexOf('disqus_thread') !== -1) {
    this.showDisqusComments();
  }
};

App.Util.inherits(App.Controllers.Post, App.Controllers.Page)

App.Controllers.Post.prototype.initPlugins = function() {

  App.Controllers.Page.prototype.initPlugins.apply(this, arguments);
  
  prettyPrint();
};

App.Controllers.Post.prototype.bindEvents = function() {
  $('#view-comments').on('click', $.proxy(this, 'onViewCommentsClick'));
};

App.Controllers.Post.prototype.onViewCommentsClick = function(e) {
  e.preventDefault();
  this.showDisqusComments();
};

App.Controllers.Post.prototype.showDisqusComments = function() {
  (function(w,p,o) {
    for(var k in o) w[k] = o[k];
    var c = document.createElement('script'); c.type = 'text/javascript'; c.async = true;
    c.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
    p.appendChild(c);
  })(window, document.getElementsByTagName('head')[0], App.Config.disqus);
};

/**********************
 * Contact controller
 **********************/
App.Controllers.Contact = function() {
  App.Controllers.Page.apply(this, arguments);
  this.bindEvents();
  this.handleForm();
};

App.Util.inherits(App.Controllers.Contact, App.Controllers.Page)

App.Controllers.Contact.prototype.initPlugins = function() {

  App.Controllers.Page.prototype.initPlugins.apply(this, arguments);
  
  $('.social-icons').tooltip({
      selector: 'a[rel=tooltip]',
      placement: 'bottom'
  });
};

App.Controllers.Contact.prototype.bindEvents = function() {
  $('.alert').on('click', '.close', $.proxy(this, 'onAlertsCloseButtonClick'));
};

App.Controllers.Contact.prototype.onAlertsCloseButtonClick = function(e) {
  $(e.currentTarget).parent().hide();
};

App.Controllers.Contact.prototype.handleForm = function() {
  $(':text,textarea').each(this.focusField);
};

App.Controllers.Contact.prototype.focusField = function() {

  var isEmpty = $.trim(this.value) === '';
  var hasError = $(this).parents('.control-group').hasClass('error');

  if ( isEmpty || hasError ) {
    this.focus();
    return false;
  }
};