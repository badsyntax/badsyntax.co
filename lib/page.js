function Page(uri) {

  var data = require('../lib/content').get(uri);

  if (data === null) {
    throw new Error('Page not found!')
  }

  if (data.view === undefined) {
    data.view = 'page/generic';
  }

  if (data.content === undefined && data.contentPath === undefined) {
    throw new Error('Page content not set!')
  }

  if (data.content === undefined && data.contentPath !== undefined) {
    data.content = require('fs').readFileSync(__dirname + '/../content/' + data.contentPath, 'utf8');
  }

  this.data = data;
}

module.exports = exports = Page;  