function Pagination(data) {
  
  this.page = data.page - 1;
  this.amount = data.amount;
  this.total = data.total;
  this.start = this.page * this.amount;
  this.end = this.total > this.amount ? this.start + this.amount : this.total;
  this.totalPages = Math.ceil(this.total / this.amount);
  this.url = data.url;

  if (this.end > this.total) {
    this.end = this.total;
  }
};

Pagination.prototype.pages = function() {
  
  var pages = [];

  for(var i = 0; i < this.totalPages; i++) {
    pages.push({
      url: this.url + ( i > 0 ? '?page=' + (i + 1) : '' ),
      title: (i + 1),
      active: (i === this.page)
    })
  }

  return pages;
};

module.exports = exports = Pagination;