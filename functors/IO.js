var _ = require("ramda");


var IO = function(f) {
  this._value = f;
};

IO.of = function(x) {
  return new IO(function() {
    return x;
  });
};

IO.prototype.map = function(f) {
  return new IO(_.compose(f, this._value));
};

module.exports = IO;