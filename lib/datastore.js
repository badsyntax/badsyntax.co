function DataStore(type) {
  this.type = type;
  this.start = 0;
  this.end = -1;
  this.whereCallback = null;
  this.data = require('../content/' + this.type + '.json');
};

DataStore.prototype.limit = function(start, end) {
  this.start = start;
  this.end = end;
  return this;
};

DataStore.prototype.where = function(callback) {
  this.whereCallback = callback;
  return this;
}

DataStore.prototype.find = function() {

  var data = this.data;

  if (typeof this.whereCallback === 'function') {
    data = data.filter(this.whereCallback);
  }

  if (this.end === -1) {
    this.end = data.length;
  }

  return data.slice(this.start, this.end);
};

module.exports = exports = DataStore;