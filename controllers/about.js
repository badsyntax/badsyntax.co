var DataStore = require('../lib/datastore');
var PageModel = require('../models/page');
var PostModel = require('../models/post');
var BaseController = require('./base').Controller;

function AboutController() { BaseController.apply(this, arguments); };
require('util').inherits(HomeController, BaseController);

AboutController.prototype.actionIndex = function() {

  // Load the page model
  var page = new PageModel( new DataStore('pages').get('about') );

  // Render the view
  this.res.render(page.view, page);
};

module.exports = HomeController;