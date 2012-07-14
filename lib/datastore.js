function DataStore(type) {
  
  this.data = null;
  this.type = type;

  this.scan();
};

DataStore.prototype.scan = function() {
  this.data = require('../content/' + this.type + '.json');
};

DataStore.prototype.findAll = function() {
  return this.data;
};

DataStore.prototype.findRecord = function(key, value) {
  
  if (key === undefined) {
    return null;
  }

  for(var i = 0, l = this.data.length; i<l; i++) {
    
    var record = this.data[i];

    if (record[key] === value) {
      return record;
    }
  }

  return null;
}

module.exports = exports = DataStore;