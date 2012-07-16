var BaseModel = require('./base');
var Globalize = require('../lib/globalize');

function PageModel() { 
  
  BaseModel.apply(this, arguments); 

  this.__defineGetter__('body', function() {

    if (this.content !== undefined) {
      return this.content;
    }
    
    if (this.contentPath === undefined) {
      throw new Error('No page content set!')
    } else {
      this.content = require('fs').readFileSync(__dirname + '/../content/' + this.contentPath, 'utf8');
    }

    return this.content;
  });

  this.__defineGetter__('url', function() {
    return '/' + this.uri;
  });

  this.__defineGetter__('date', function() {
    Globalize.culture('en-GB');
    return Globalize.format( new Date(this.dateCreated), 'D');
  });
};

require('util').inherits(PageModel, BaseModel);

module.exports = exports = PageModel;  