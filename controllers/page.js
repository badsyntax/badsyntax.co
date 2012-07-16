var DataStore = require('../lib/datastore');
var PageModel = require('../models/page');
var BaseController = require('./base');

function PageController() { 

  this.view = this.view || {};
  this.controllerName = this.controllerName || 'Page';
  this.breadcrumbs = this.breadcrumbs || [{
    url: '/',
    title: 'Home'
  }];

  BaseController.apply(this, arguments); 
};
require('util').inherits(PageController, BaseController);

PageController.prototype.after = function() {

  BaseController.prototype.after.apply(this, arguments);

  if (this.page === undefined) {

    var uri = this.req.url.replace('/', '');

    // Load the page data record
    var record = new DataStore('pages').where(function(page){
      return page.uri == uri
    }).find()[0];

    if (!record) {
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
  var navPages = new DataStore('pages').find().filter(function(page){
    return !!page.showInNav;
  }).map(function(data){
    return new PageModel(data);
  });

  // Load the navigation view
  this.view.navigation = this.renderView('fragments/navigation.mustache', { 
    pages: navPages
  });

  // Load the breadcrumbs view
  this.view.breadcrumbs = this.renderView('fragments/breadcrumbs.mustache', { 
    breadcrumbs: this.breadcrumbs
  });

  // Add data to view
  this.view.scripts = this.renderView('fragments/scripts.mustache');
  this.view.page = this.page;
  this.view.controllerName = this.controllerName;

  // Render the view
  this.res.render(this.page.view, this.view);
}

module.exports = PageController;