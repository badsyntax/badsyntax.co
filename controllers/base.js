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
    this.ViewModel.exportData();
    this.res.render(this.ViewModel.view, this.ViewModel.data);
  },
  actionIndex: function(req, res) {
    return true;
  }
};

exports.Controller = BaseController;