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

PageController.prototype.after = function() {

  BaseController.prototype.after.apply(this, arguments);

  if (this.page === undefined) {

    var uri = (this.req.route.contentUri || this.req.url.replace('/', '')).replace(/\?.*$/, '');

    // Load the page data record
    var record = new DataStore('pages').where(function(page){
      return page.uri == uri
    }).find()[0];

    if (!record) {
      console.log('Page record not found for URI:', uri);
      console.log('Route:', this.req.route);
      this.res.send(404);
      return;
    }

    // Load the page model
    this.page = new PageModel( record );
  }

  // Update breadcrumbs
  this.breadcrumbs.push({
    uri: this.req.url,
    title: this.page.title,
    last: true
  });

  // Load the navigation pages
  var navPages = new DataStore('pages').where(function(page){
    return !!page.showInNav;
  }).find().map(function(data){
    return new PageModel(data);
  });

  // Load the navigation view
  this.view.navigation = new View('fragments/navigation.mustache', { 
    pages: navPages
  }).render();

  // Load the breadcrumbs view
  this.view.breadcrumbs = new View('fragments/breadcrumbs.mustache', { 
    breadcrumbs: this.breadcrumbs
  }).render();

  // Add data to view
  this.view.scripts = new View('fragments/scripts.mustache').render();
  this.view.page = this.page;
  this.view.controller = this.req.route.controller.charAt(0).toUpperCase() + this.req.route.controller.slice(1);

  // Render the view
  this.res.render(this.page.view, this.view);
}

module.exports = PageController;