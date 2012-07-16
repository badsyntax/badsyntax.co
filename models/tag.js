var BaseModel = require('./base');

function TagModel() {
  BaseModel.apply(this, arguments);
}

require('util').inherits(TagModel, BaseModel);

module.exports = exports = TagModel;  