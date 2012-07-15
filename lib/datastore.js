function DataStore(type) {
  
  this.data = null;
  this.type = type;
  this.start = 0;
  this.end = -1;

  this.scan();
};

DataStore.prototype.scan = function() {
  this.data = require('../content/' + this.type + '.json');
};

DataStore.prototype.setStart = function(value) {
  this.start = value;
};

DataStore.prototype.setEnd = function(value) {
  this.end = value;
};

DataStore.prototype.limit = function(start, end) {
  this.setStart(start);
  this.setEnd(end);
};

DataStore.prototype.findAll = function() {
  
  if (this.end === -1) {
    this.end = this.data.length;
  } 

  var data = [];

  for(var i = this.start; i < this.end; i++) {
    data.push(this.data[i]);
  };

  return data;
};

DataStore.prototype.findRecord = function(key, value) {

  for(var i = 0, l = this.data.length; i<l; i++) {
    
    var record = this.data[i];

    if (record[key] === value) {
      return record;
    }
  }

  return null;
}

module.exports = exports = DataStore;