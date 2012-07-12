var DataStore = require('./datastore');

function Navigation() {}

Navigation.prototype.getData = function() {
  
  if (!this.data) {
    this.data = (new DataStore('pages')).get();
  }

  return this.data;
};

Navigation.prototype.getPageTree = function() {

  var data = this.getData(), tree = [];

  for(var i = 0, l = data.length; i<l; i++) {
    tree.push({
      url: data[i].uri,
      title: data[i].title 
    });
  }

  return tree;
};


module.exports = exports = Navigation;  