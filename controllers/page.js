var DataStore = require('../lib/datastore');
var PageModel = require('../models/page');
var BaseController = require('./base');
var View = require('../lib/view');

function PageController() { 

  this.breadcrumbs = this.breadcrumbs || [{
    url: '/',
    title: 'Home'
  }];

  BaseController.apply(this, arguments); 
};
require('util').inherits(PageController, BaseController);

PageController.prototype.actionIndex = function() {
  return true;
};

PageController.prototype.getPage = function() {

  if (this.page !== undefined) {
    return this.page;
  }

  var uri = (this.req.route.contentUri || this.req.url.replace('/', '')).replace(/\?.*$/, '');

  // Load the page data record
  var record = new DataStore('pages').where(function(page){
    return page.uri == uri
  }).find()[0];

  if (!record) {
    return false;
  }

  return new PageModel( record );
};

PageController.prototype.getNavPages = function(uri) {

  return new DataStore('pages').where(function(page){
    return !!page.showInNav;
  }).find().map(function(data){
    data.active = (data.uri == uri);
    return new PageModel(data);
  });
};

PageController.prototype.after = function() {

  BaseController.prototype.after.apply(this, arguments);

  this.page = this.getPage();

  if (!this.page) {
    this.res.send(404);
    return;
  }

  this.breadcrumbs.push({
    uri: this.req.url,
    title: this.page.title,
    last: true
  });

  this.view.navigation = new View('fragments/navigation.mustache', { 
    pages: this.getNavPages(this.page.uri)
  }).render();

  this.view.breadcrumbs = new View('fragments/breadcrumbs.mustache', { 
    breadcrumbs: this.breadcrumbs
  }).render();

  var assetsDomain = this.app.address().address === '127.0.0.1' ? '/' : '//assets.badsyntax.co/';

  this.view.head = new View('fragments/head.mustache', { 
    assetsDomain: assetsDomain,
    page: this.page
  }).render();

  this.view.scripts = new View('fragments/scripts.mustache', {
    assetsDomain: assetsDomain,
    controller: this.req.route.controller.charAt(0).toUpperCase() + this.req.route.controller.slice(1),
    config: {
      trackPage: this.app.address().address !== '127.0.0.1'
    }
  }).render();

  this.view.page = this.page;

  // Render the view
  this.res.render(this.page.view, this.view);
}

module.exports = PageController;