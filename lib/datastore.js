function DataStore(type) {
  
  this.data = null;
  this.type = type;

  this.scan();
};

DataStore.prototype.scan = function() {
  this.data = require('../content/' + this.type + '.json');
};

DataStore.prototype.get = function(uri) {
  
  if (uri === undefined) {
    return this.data;
  }

  for(var i=0, l=this.data.length; i<l; i++) {
    
    var item = this.data[i];

    if (item.uri === uri) {
      return item;
    }
  }

  return null;
}

module.exports = exports = DataStore;