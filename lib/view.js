function View(path, data) {
  this.path = path;
  this.data = data;
  this.view = require('fs').readFileSync(__dirname + '/../views/' + path, 'utf8');
};

View.prototype.render = function() {
  return require('stache').render(this.view, this.data || {});
};

module.exports = exports = View;