var _ = require("ramda");


var IO = function(f) {
  this.unsafePerformIO = f;
};

IO.prototype.map = function(f) {
  return new IO(_.compose(f, this.unsafePerformIO));
};


IO.of = function(x) {
  return new IO(function() {
    return x;
  });
};
      
      


module.exports = IO;