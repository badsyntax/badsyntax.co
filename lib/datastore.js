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
  
  if (!this.filteredData) { 
    this.filteredData = [];
    for(var i = 0, l = this.data.length; i < l; i++) {
      if (typeof this.whereCallback !== 'function' || this.whereCallback(this.data[i])) {
        this.filteredData.push(this.data[i]);
      }
    };
  }

  if (this.end === -1) {
    this.end = this.filteredData.length;
  }

  var data = [];
  for(var i = this.start; i < this.end; i++) {
    data.push(this.filteredData[i]);
  };

  return data;
};

module.exports = exports = DataStore;