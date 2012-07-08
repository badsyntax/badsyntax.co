function Page(uri) {

  this.data = require('../lib/content').get(uri);

  if (this.data === null) {
    throw new Error('Page not found!')
  }

  if (this.data.view === undefined) {
    this.data.view = 'page/generic';
  }

  this.ViewModel = new (require('../viewmodels/' + this.data.view));
  this.ViewModel.set(this.data);
}

module.exports = exports = Page;  