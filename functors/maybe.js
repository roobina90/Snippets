// Maybe :: x -> Maybe x
var Maybe = function(x) {
    this._value = x;
};
// of :: x -> Maybe x
Maybe.of = function(x) {
    return new Maybe(x);
};
// isNothing :: _ -> bool
Maybe.prototype.isNothing = function() {
    return this._value == null;
};
// map :: f -> Maybe x
Maybe.prototype.map = function(f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this._value));
}

module.exports = Maybe;