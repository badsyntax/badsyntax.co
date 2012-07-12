var Content = { data: null };

Content.scan = function() {
  this.data = require('../content/content.json');
};

Content.get = function(uri) {
  
  if (this.data === null) {
    this.scan();
  }

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

module.exports = exports = Content;