var App = App || { 
  Config: {}, 
  Util: {}, 
  Controllers: {} 
};

/**********************
 * App config
 **********************/
App.Config.Disqus = {
  disqus_developer: ( document.domain == '127.0.0.1' ),
  disqus_shortname: 'badsyntax'
};
App.Config.Analytics = {
  account: 'UA-1636725-27'
};
App.Config.GooglePlus = {
  ___gcfg: {
    lang: 'en-GB' 
  }
};

/**********************
 * App util
 **********************/
App.Util.inherits = function(_sub, _super) {

  function F() {};
  F.prototype = _super.prototype;

  _sub.prototype = new F();
  _sub.prototype.constructor = _sub;
}; 

App.Util.insertScript = function(id, url) {

  if (document.getElementById(id)) return;

  (!this.head) && (this.head = document.getElementsByTagName('head')[0]);

  var script = document.createElement('script');
  script.id = id;
  script.src = url;
  script.async = true;
  this.head.appendChild(script, this.insert);
};

App.Util.globalizeConfig = function(config) {
  for(var k in config) {
    window[k] = config[k];
  }
};

/**********************
 * Base controllers
 **********************/
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

  if (!this.config.trackPage) return;

  window._gaq = [];
  window._gaq.push(['_setAccount', App.Config.Analytics.account]);
  window._gaq.push(['_trackPageview']);

  var url = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  
  App.Util.insertScript('google-analytics', url);
};

App.Controllers.Page.prototype.initPlugins = function() {};

/**********************
 * Blog controller
 **********************/
App.Controllers.Blog = function() {
  
  App.Controllers.Page.apply(this, arguments);

  this.getElements();
  this.bindEvents();
  this.showDisqusCommentsCount();
};

App.Util.inherits(App.Controllers.Blog, App.Controllers.Page);

App.Controllers.Blog.prototype.initPlugins = function() {
  App.Controllers.Page.prototype.initPlugins.apply(this, arguments);
  prettyPrint();
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

App.Controllers.Blog.prototype.showDisqusCommentsCount = function() {
  App.Util.globalizeConfig( App.Config.Disqus );
  App.Util.insertScript('disqus-comments-count', 'http://' + App.Config.Disqus.disqus_shortname + '.disqus.com/count.js');
};

/**********************
 * Post controller
 **********************/
App.Controllers.Post = function() {

  App.Controllers.Page.apply(this, arguments);

  this.bindEvents();
  this.showGooglePlusButton();
  this.showTweetButton();

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

App.Controllers.Post.prototype.showTweetButton = function() {
  App.Util.insertScript('twitter-wjs', '//platform.twitter.com/widgets.js');
};

App.Controllers.Post.prototype.showGooglePlusButton = function() {
  App.Util.globalizeConfig( App.Config.GooglePlus );
  App.Util.insertScript('google-plus', 'https://apis.google.com/js/plusone.js');
};

App.Controllers.Post.prototype.onViewCommentsClick = function(e) {
  e.preventDefault();
  e.target.disabled = true;
  e.target.className += ' disabled';
  this.showDisqusComments();
};

App.Controllers.Post.prototype.showDisqusComments = function() {
  
  window.disqus_config = this.disqusConfig;

  App.Util.globalizeConfig( App.Config.Disqus );
  App.Util.insertScript('disqus-comments', 'http://' + App.Config.Disqus.disqus_shortname + '.disqus.com/embed.js');
};

App.Controllers.Post.prototype.disqusConfig = function() {
  this.callbacks.onReady.push(App.Controllers.Post.prototype.onDisqusReady);
};

App.Controllers.Post.prototype.onDisqusReady = function() {
  $('html,body').animate({
    scrollTop: $('#disqus_thread').offset().top - 70 
  }, 800);
};

/**********************
 * Contact controller
 **********************/
App.Controllers.Contact = function() {
  App.Controllers.Page.apply(this, arguments);
  this.bindEvents();
  this.focusForm();
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

App.Controllers.Contact.prototype.focusForm = function() {
  $('.contact-form').find(':text,textarea').each(this.focusField);
};

App.Controllers.Contact.prototype.focusField = function() {

  var isEmpty = $.trim(this.value) === '';
  var hasError = $(this).parents('.control-group').hasClass('error');

  if ( isEmpty || hasError ) {
    this.focus();
    return false;
  }
};