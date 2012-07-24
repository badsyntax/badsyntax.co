function Validator(data) {
  this.data = data;
  this.rules = [];
};

Validator.prototype.rule = function(key, rule, message) {
  this.rules.push({
    key: key,
    rule: rule,
    message: message
  });
};

Validator.prototype.check = function() {
 
  var errors = {};

  this.rules.forEach(function(rule){
    
    var passed = rule.rule(this.data[rule.key]);

    if (!passed && errors[rule.key] === undefined) {
      errors[rule.key] = rule.message;
    }

  }.bind(this));

  return Object.keys(errors).length !== 0 ? errors : null;
};

module.exports = exports = Validator;