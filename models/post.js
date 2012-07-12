var DataStore = require('../lib/datastore');

function Post(data) {

  if (data.content === undefined && data.contentPath !== undefined) {
    data.content = require('fs').readFileSync(__dirname + '/../content/' + data.contentPath, 'utf8');
  }

  for(var key in data) {
    this[key] = data[key];
  }

  this.url = '/post/' + this.uri;
}

module.exports = exports = Post;  