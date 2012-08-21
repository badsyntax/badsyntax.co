var Valid = (function() {
  return {
    notEmpty: function(val) {
      return [ null, false, '', [] ].indexOf(val) === -1;
    },
    isEmail: function(val) {
      // RFC822 - Based on code written by Ross Kendall - http://goo.gl/bNP6l
      return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( val );
    }
  }
})();

function Validator(data) {
  this.data = data;
  this.rules = [];
};

Validator.prototype.rule = function(key, func, message) {
  
  if (typeof func === 'string') {
    func = Valid[func];
    if (func === undefined) return;
  }

  this.rules.push({
    key: key,
    func: func,
    message: message
  });
};

Validator.prototype.check = function() {
 
  var errors = {};

  this.rules.forEach(function(rule){

    var isValid = rule.func(this.data[rule.key]);

    if (!isValid && errors[rule.key] === undefined) {
      errors[rule.key] = rule.message;
    }

  }.bind(this));

  return Object.keys(errors).length !== 0 ? errors : null;
};

module.exports = exports = Validator;