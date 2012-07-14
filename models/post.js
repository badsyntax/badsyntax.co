var PageModel = require('./page');

function PostModel() {

  PageModel.apply(this, arguments); 

  this.__defineGetter__('url', function() {
    return '/post/' + this.uri;
  });
}

require('util').inherits(PostModel, PageModel);

module.exports = exports = PostModel;  