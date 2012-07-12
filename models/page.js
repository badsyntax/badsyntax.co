function Page(data) {

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

  for(var key in data) {
    this[key] = data[key];
  }

  this.url = '/' + this.uri;
}

module.exports = exports = Page;  