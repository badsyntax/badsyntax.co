var DataStore = require('../lib/datastore');
var PageModel = require('../models/page');

function BaseController(app, req, res, action) {

  this.app = app;
  this.req = req;
  this.res = res;
  this.action = action || 'actionIndex';

  this.before();
  this[this.action]();
  this.after();
};

BaseController.prototype = {
  before: function() {

    var navPages = new DataStore('pages').get().map(function(data){
      return new PageModel(data);
    });

    // Set global view vars
    this.app.set('view options', { 
      navigation: this.renderView('fragments/navigation.mustache', { 
        pages: navPages
      })
    });
  },
  after: function() {
    return true;
  },
  renderView: function(filename, data) {

    var view = require('fs').readFileSync(__dirname + '/../views/' + filename, 'utf8');
    
    return require('stache').render(view, data);
  },
  actionIndex: function(req, res) {
    return true;
  }
};

exports.Controller = BaseController;