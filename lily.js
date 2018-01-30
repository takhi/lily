const Lily = require('./engine.js');

var argv = process.argv;
var i = 2, numbers = [];

for (; i < argv.length - 1; i++) {
    numbers.push(parseInt(argv[i]));
}

if (numbers.length <= 2) {
    console.log('Find arithmetic expressions that equal a target number.\n');
    console.log('LILY [set of (>= 2) numbers] [target number]');
} else {
    var lily = new Lily(numbers);
    var solutions = lily.find(parseInt(argv[argv.length - 1]));
    console.log('Start');
    for (i = 0; i < solutions.length; i++) {
        console.log(solutions[i]);
    }
    console.log('End\n');
    console.log(solutions.length + ' Total');
}