var DataStore = require('../lib/datastore');
var PageModel = require('../models/page');
var BaseController = require('./base');

function PageController() { 
  this.view = {};
  BaseController.apply(this, arguments); 
};
require('util').inherits(PageController, BaseController);

PageController.prototype.after = function() {

  if (this.page === undefined) {

    var uri = this.req.url.replace('/', '');

    // Load the page data record
    var record = new DataStore('pages').findRecord('uri', uri);

    if (record === null) {
      this.res.send(404);
      return;
    }

    // Load the page model
    this.page = new PageModel( record );
  }

  // Load the navigation pages
  var navPages = new DataStore('pages').findAll().map(function(data){
    return new PageModel(data);
  }).filter(function(page){
    return !!page.showInNav;
  });

  // Load the navigation view
  this.view.navigation = this.renderView('fragments/navigation.mustache', { 
    pages: navPages
  });

  // Add the page data to the view
  this.view.page = this.page;

  // Render the view
  this.res.render(this.page.view, this.view);
}

module.exports = PageController;