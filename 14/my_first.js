console.log("Welcome to JS!")

// 5 primitive types. Number, string, bool, null, undefined. (Also symbol and BigInt)

// JS REPL available in most browser dev tools


console.log("~~~~~~Numbers~~~~~")
// Only 1 number type
console.log(typeof (5))
console.log(typeof (-5.1234))

// Order of ops uses pemdas
// Typical math ops, +-*/%, ** for exponent
// Integer divison uses decimals
console.log(9 / 2)

// Not real numbers are NaN, but the type is number still
console.log(0 / 0)
console.log(typeof (NaN))

let x = 15;
// +=, -=, /=, *=, %= is supported.
x += 5;
x %= 2;

// -- and ++ also supported as pre & post
x++;
++x;
x--;
--x;

console.log("~~~~~~Variables~~~~~")
// let var = val;
let z = 5;
console.log(x)
// Can set var = expression
let y = 5 + 4;
console.log(y)

// use const instead of let for non-modifable var
const constant = 5;
// constant += 1; This will error

// Previously, var was used instead of let / const. 
// var is mostly unused now, as it is a global declaration vs. scoped which let uses

console.log("~~~~Bools~~~~~")
// true, false in lower case
let t = true;
let f = false;
// let a = False;

// Variables are not permanently typed.
// This is dumb.
t = 5;
t = true;

// JS identifier naming conventions /////
// cant start with digit, no spaces, etc. typical
// camelCaseIsTheStandard
// booleans with isThisTrue
