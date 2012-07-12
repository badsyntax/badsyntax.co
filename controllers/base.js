function BaseController(app, req, res, action) {

  this.app = app;
  this.req = req;
  this.res = res;
  this.action = action;

  this.before();
  this[this.action]();
  this.after();
};

BaseController.prototype = {
  before: function() {
    return true;
  },
  after: function() {

    // Set global view vars
    this.app.set('view options', { 
      navigation: this.renderView('fragments/navigation.mustache', { test: 'test' }) 
    });

    this.ViewModel.exportData();
    this.res.render(this.ViewModel.view, this.ViewModel.data);
  },
  renderView: function(filename, data) {
    // Here we should rather render the viewmodel
    var view = require('fs').readFileSync(__dirname + '/../views/' + filename, 'utf8');
    return require('stache').render(view, data);
  },
  actionIndex: function(req, res) {
    return true;
  }
};

exports.Controller = BaseController;