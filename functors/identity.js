var Identity = function(x) {
    this._value = x;
}

Identity.of = function(x) { return new Identity(x);};

Identity.prototype.map = function(f) {
    return Identity.of(f(this._value));
}

module.exports = Identity;