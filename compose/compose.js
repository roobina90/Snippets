var _ = require('ramda');
var accounting = require('accounting');

// Example Data
var CARS = [{
  name: 'Ferrari FF',
  horsepower: 660,
  dollar_value: 700000,
  in_stock: true,
}, {
  name: 'Spyker C12 Zagato',
  horsepower: 650,
  dollar_value: 648000,
  in_stock: false,
}, {
  name: 'Jaguar XKR-S',
  horsepower: 550,
  dollar_value: 132000,
  in_stock: false,
}, {
  name: 'Audi R8',
  horsepower: 525,
  dollar_value: 114200,
  in_stock: false,
}, {
  name: 'Aston Martin One-77',
  horsepower: 750,
  dollar_value: 1850000,
  in_stock: true,
}, {
  name: 'Pagani Huayra',
  horsepower: 700,
  dollar_value: 1300000,
  in_stock: false,
}];

// Exercise 1:
// ============
// Use _.compose() to rewrite the function below. Hint: _.prop() is curried.

var isLastInStock = _.compose(_.prop('in_stock'), _.last);
// var isLastInStock = function(cars) {
//   var last_car = _.last(cars);
//   return _.prop('in_stock', last_car);
// };

// Exercise 2:
// ============
// Use _.compose(), _.prop() and _.head() to retrieve the name of the first car.
var nameOfFirstCar = _.compose(_.prop('name'), _.head);

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition.
var _average = function(xs) {
  return _.reduce(_.add, 0, xs) / xs.length;
}; // <- leave be


var averageDollarValue = _.compose(_average, _.map(_.prop('dollar_value')));
// var averageDollarValue = function(cars) {
//   var dollar_values = _.map(function(c) {
//     return c.dollar_value;
//   }, cars);
//   return _average(dollar_values);
// };


// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored car's names: e.g: sanitizeNames([{name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true}]) //=> ['ferrari_ff'].

var _underscore = _.replace(/\W+/g, '_'); //<-- leave this alone and use to sanitize

function toLowerCase(string) {
  return string.toLowerCase();
}

var sanitizeNames = _.map(_.compose(_underscore, toLowerCase, _.prop('name')));


// Bonus 1:
// ============
// Refactor availablePrices with compose.



var availablePrices = _.compose(_.join(', '), _.map(accounting.formatMoney),_.map(_.prop('dollar_value')),_.filter(_.prop('in_stock')));
// var availablePrices = function(cars) {
//   var available_cars = _.filter(_.prop('in_stock'), cars);
//   return available_cars.map(function(x) {
//     return accounting.formatMoney(x.dollar_value);
//   }).join(', ');
// };


// Bonus 2:
// ============
// Refactor to pointfree. Hint: you can use _.flip().



var fastestCar = _.compose(_.flip(_.concat)(' is the fastest'), _.prop('name'),_.last, _.sortBy(_.prop('horsepower')))
// var fastestCar = function(cars) {
//   var sorted = _.sortBy(function(car) {
//     return car.horsepower;
//   }, cars);
//   var fastest = _.last(sorted);
//   return fastest.name + ' is the fastest';
// };


module.exports = { CARS: CARS,
                   isLastInStock: isLastInStock,
                   nameOfFirstCar: nameOfFirstCar,
                   fastestCar: fastestCar,
                   averageDollarValue: averageDollarValue,
                   availablePrices: availablePrices,
                   sanitizeNames: sanitizeNames
                 };
