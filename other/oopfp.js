const ramda = require("ramda");

//classical way
function myEmployee(n, s) {
    var name, salary;
    (function initialize() {
        name = n;
        salary = s;
    }());

    function changeSalary(payRise) {
        salary += payRise;
    }

    function introduce() {
        return `Employee name : ${name} earns ${salary}$ a month`;
    }

    return {
        giveAPayRise: changeSalary,
        sayHello: introduce
    };
}

var employees = [myEmployee("Kate", 1200), myEmployee("Leopolod", 1000) ];

employees.forEach(function(employee) {
    employee.giveAPayRise(100);
});

employees.forEach(function(employee) {
    console.log(employee.sayHello());
});

//slightly functional style

var employees = [["Kate2", 1200], ["Leopold2", 1000]];

function sum(a,b) {
    return a + b;
}

function sayHello(name, salary) {
    return `Employee name : ${name} earns ${salary}$ a month`;
}

function createHappierEmployee(employee){
    return [employee[0], sum(employee[1], 100)];
}

function sayHelloEmployee(employee) {
    return sayHello(employee[0], employee[1]);
}


//composing console.log lol
var payRise = ramda.compose(console.log, ramda.map(sayHelloEmployee), ramda.map(createHappierEmployee));

payRise(employees);

//var happyEmployees = employees.map(createHappierEmployee);
//console.log(happyEmployees.map(sayHelloEmployee));