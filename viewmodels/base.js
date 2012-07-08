function BaseViewModel() {
  this.data = {};
  this.view = null;
};

BaseViewModel.prototype = {
  set: function(key, value) {
    if (typeof key === 'object') {
      for(var prop in key) {
        this.set(prop, key[prop]);
      }
    } else {
      this.data[key] = value;
    }
  },
  exportData: function() {
    
    for(var prop in this) {

      var isVarMethod = (typeof this[prop] === 'function' && prop.slice(0, 4) === 'var_');

      if (isVarMethod) {
        this.set(prop.slice(4), this[prop]());
      }
    }
  }
};

exports = module.exports = BaseViewModel;