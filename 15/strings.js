// STRINGS ARE IMMUTABLE

// Strings can use single or double quotes
let a = "  string  ";
let b = 'another string';

// strings are indexed, from 0
console.log(a[0])
console.log(b[1])

// strings have a length property
console.log(a.length)

// concatenate with +!
console.log("str1" + "str2")

// Built in string methods. must have parent
a.toUpperCase()
console.log(a)  // Still lower case!
console.log(a.toUpperCase())

console.log(a.trim().length)

// chaining methods is ok.
let chainedA = a.trim().toUpperCase();

// methods w/ arg
let cd = "catdog";
cd.indexOf("cat") // returns -1 if not found. Returns the 1st occurrence idx
console.log(cd.slice(0, 3))  // end index is not inclusive
// negative indexing also supported like py
console.log(cd.slice(-1))

// replace will also take in a regex.
console.log(cd.replace("cat", "dog"))


// Template literals
let product = "Chicken";
let cost = 1.99;
let qty = 2;
console.log("You bought " + qty + " " + product + ". It cost $" + cost * qty)
console.log(`You bought ${qty} ${product} with a template literal. It cost $${cost * qty}`)

console.log(`This is the result of 2 + 5 in a template literal: ${2 + 5}`)

// Null & undefined
null  // value of null, type object. Similar to None in python
undefined // value of undefined, type undefined. Typically not set by us

// Math object! No import needed, included for free
// Math.PI, Math.round(number), Math.pow(2,5), Math.floor(3.434343) etc.
Math.random() // Random between [0,1)

// rand between 1 & 10
console.log(Math.floor(Math.random() * 10) + 1)