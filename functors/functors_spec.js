var Identity = require('./identity');
var Maybe = require('./maybe');
var Either = require('./either');
var Left = Either.Left, Right = Either.Right;
var IO = require('./IO');
var assert = require("chai").assert;
var _ = require("ramda");
var E = require('./functors_ex');


describe("Functor Exercises", function(){

  it('Exercise 1', function(){
    assert.deepEqual(E.ex1(Identity.of(2)), Identity.of(3));
  });

  it('Exercise 2', function(){
    var xs = Identity.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
    assert.deepEqual(E.ex2(xs), Identity.of('do'));
  });

  it('Exercise 3', function(){
    var user = { id: 2, name: "Albert" };
    assert.deepEqual(E.ex3(user), Maybe.of('A'));
  });

  it('Exercise 4', function(){
    assert.deepEqual(E.ex4("4"), Maybe.of(4));
  });

  it('Exercise 5', function(done){
    E.ex5(13).fork(console.log, function(res){
      assert.deepEqual(res, 'LOVE THEM FUTURES');
      done();
    })
  });

  it('Exercise 6', function(){
    assert.deepEqual(E.ex6({active: false, name: 'Gary'}), Left.of('Your account is not active'));
    assert.deepEqual(E.ex6({active: true, name: 'Theresa'}), Right.of('Welcome Theresa'));
  });

  it('Exercise 7', function(){
    assert.deepEqual(E.ex7("fpguy99"), Right.of("fpguy99"));
    assert.deepEqual(E.ex7("..."), Left.of("You need > 3"));
  });

  it('Exercise 8', function(){
    assert.deepEqual(E.ex8("fpguy99").unsafePerformIO(), "fpguy99-saved");
    assert.deepEqual(E.ex8("...").unsafePerformIO(), "You need > 3");
  });
});


/* ********************************************************** */

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
