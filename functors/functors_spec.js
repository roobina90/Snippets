var Identity = require('./identity');
var Maybe = require('./maybe');
var Either = require('./either');
var IO = require('./IO');
var assert = require("chai").assert;
var _ = require("ramda");



describe("Either Functor", function () {

    it('maps over Right', function () {
        var element = Either.Right.of('rain').map(function (str) {
            return 'b' + str;
        });
        assert.deepEqual(element, Either.Right.of("brain"));
    });


    it('maps over Right ramda', function () {
        var element = Either.Right.of({
            host: 'localhost',
            port: 80,
        }).map(_.prop('host'));

        assert.deepEqual(element, Either.Right.of("localhost"));
    });


    it('maps over Left', function () {
        var element = Either.Left.of('rain').map(function (str) {
            return 'b' + str;
        });
        assert.deepEqual(element, Either.Left.of("rain"));
    });

    
    it('maps over Left ramda', function () {
        var element = Either.Left.of('rolls eyes...').map(_.prop('host'));
        assert.deepEqual(element, Either.Left.of("rolls eyes..."));
    });

});


describe("Identity Functor", function () {

    it('wraps param', function () {
        var element = Identity.of(5);
        assert.equal(element._value, 5);
    });


    it('maps over param', function () {
        var element = Identity.of({ name: "Kate" });
        assert.deepEqual(element.map(el => el.name), Identity.of("Kate"));
    });

});


describe("Maybe Functor", function () {

    it('wraps a param', function () {
        var element = Maybe.of(5);
        assert.equal(element._value, 5);
    });


    it('wraps a undefined param', function () {
        var element = Maybe.of();
        assert.equal(element._value, undefined);
    });


    it('maps over element', function () {
        var element = Maybe.of({ name: "Leopold" });
        assert.deepEqual(element.map(el => el.name), Maybe.of("Leopold"));
    });


    it('maps over undefined element with no error', function () {
        var element = Maybe.of(null);
        assert.deepEqual(element.map(el => el.name), Maybe.of(null));
    });



    it('maps over bad structure with no error', function () {
        var element = Maybe.of({ age: 26 });
        assert.deepEqual(element.map(el => el.name), Maybe.of(undefined));
    });
});
