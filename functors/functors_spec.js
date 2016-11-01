var Identity = require('./identity');
var Maybe = require('./maybe');
var assert = require("chai").assert;

describe("Identity Functor", function(){

  it('wraps param', function(){
      var element = Identity.of(5);
    assert.equal(element._value, 5);
  });

  
  it('maps over param', function(){
      var element = Identity.of({name: "Kate"});
    assert.deepEqual(element.map(el => el.name), Identity.of("Kate"));
  });
  
});


describe("Maybe Functor", function(){

  it('wraps a param', function(){
      var element = Maybe.of(5);
    assert.equal(element._value,  5);
  });


  it('wraps a undefined param', function(){
      var element = Maybe.of();
    assert.equal(element._value,  undefined);
  });

  
  it('maps over element', function(){
      var element = Maybe.of({name: "Leopold"});
    assert.deepEqual(element.map(el => el.name),  Maybe.of("Leopold"));
  });


  it('maps over undefined element with no error', function(){
      var element = Maybe.of(null);
    assert.deepEqual(element.map(el => el.name),  Maybe.of(null));
  });



  it('maps over bad structure with no error', function(){
      var element = Maybe.of({age: 26});
    assert.deepEqual(element.map(el => el.name),  Maybe.of(undefined));
  });
});
