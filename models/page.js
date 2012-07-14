var BaseModel = require('./base');

function PageModel() { 
  
  BaseModel.apply(this, arguments); 

  this.__defineGetter__('body', function() {

    if (this.content === undefined) {
      if (this.contentPath === undefined) {
        throw new Error('No page content set!')
      } else {
        this.content = require('fs').readFileSync(__dirname + '/../content/' + this.contentPath, 'utf8');
      }
    }

    return this.content;
  });

  this.__defineGetter__('url', function() {
    return '/' + this.uri;
  });
};

require('util').inherits(PageModel, BaseModel);

module.exports = exports = PageModel;  