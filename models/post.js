var PageModel = require('./page');

function PostModel() {
  PageModel.apply(this, arguments);
}

require('util').inherits(PostModel, PageModel);

module.exports = exports = PostModel;  