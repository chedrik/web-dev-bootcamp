///////// Scope /////////
// Variables are scoped in functions like most languages.
function setEggs() {
    eggs = 5
}
// Variables defined outside of a function are global (at least to the file)
let eggs = 0;
console.log(eggs)
setEggs()
console.log(eggs)

// JS will search scope from local to global
function setEggs2() {
    let eggs = 10;
    console.log(eggs)
}
setEggs2()  // 10
console.log(eggs)  // Value from setEggs, 5

// Can even redefine a var with 'const' in a different scope

// let, const are block scoped too!
if (true) {
    let value = 10;
    const constant = 5;
    var exists = true;
}
// value, constant don't exist anymore!
// BUT! 'var' is scoped to functions, & not block
console.log(exists)  // true



// lexical scope
// Only inherits down, not up!
function outer() {
    const value = "Im defined in the outter fcn";
    function inner() {
        // Inner fcn inherits the outer scope!
        // Can nest and inherit as much as desired
        console.log(value)
    }
    inner()
}
outer()

// Function Expressions
// Setting a fcn to a variable!
// Fcns are objects that can be stored, passed around, etc.
const square = function (x) {
    return x ** 2;
}
console.log(square(7))

// Higher order fcns
// Fcns that operate on other fcns (as arg or as a return val)

// Ex. pass a num, make a fcn to multiple a num by that number
function makeMultiplier(times) {
    const multiply = function (x) {
        // multiplies x by the arg passed to makeMultiplier
        return x * times;
    }
    return multiply
}
let multiplier = makeMultiplier(4);
console.log(multiplier(2))

// Alternatively, you dont even need to define the return fcn
function makeRandFunc() {
    const rand = Math.random();
    if (rand > 0.5) {
        return function () {
            console.log('Bigger than 0.5')
        }
    } else {
        return function () {
            console.log('Smaller than 0.5')
        }
    }
}
let number = makeRandFunc();
number()



// Accepted a fcn as an arg
function callTwice(f) {
    f();
    f();
}
function rollDie() {
    const roll = Math.floor(Math.random() * 6) + 1
    console.log(roll)
}
console.log('calling twice...')
callTwice(rollDie)
// Notice that there is no () for rollDie!
// If you have () then the fcn would be executed prior to being passed to the callTwice fcn


// Methods = fcns that are object properties
// All methoads are fcn, not all fcn are methods

const my_obj = {
    my_value: 'Its mine!',
    add: function (x, y) {
        return x + y;
    },
    // Shorthand, dont need the fcn keyword
    echo(x) {
        console.log(x)
    },
    echo_my_val() {
        console.log(`This is ${this}`)
        console.log(`${this.my_value}`)
    }
}

console.log(`My method says ${my_obj.add(5, 4)}`)
my_obj.echo(4)
my_obj.echo_my_val()
// Notice that 'this' changes depending on invocation
// When executed in console, default obj is window
const obj_ex = my_obj.echo_my_val;
obj_ex()

// const square = {
//     area(side) {
//         return side * side;
//     },
//     perimeter(side) {
//         return side * 4;
//     }
// }

const hen = {
    name: 'Helen',
    eggCount: 0,
    layAnEgg() {
        this.eggCount++;
        return 'EGG';
    }
};

// Try / catch
try {
    hello.iDontExit()
} catch (e) {
    console.log(e)
    console.log('I got caught!')
}

