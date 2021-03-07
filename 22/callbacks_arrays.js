// Array methods!
// with arrow functions!
let numbers = [0, 1, 2, 3, 4, 5];

// FOR EACH
// Accepts some callback fcn! Can be anonymous, as here:
numbers.forEach(function (el) {
    console.log(el)
})
// Less common now due to for of
for (let el of numbers) {
    console.log(el)
}

//  MAP
// creates new array
const num_sq = numbers.map(function (num) {
    return num ** 2;
})
console.log(num_sq)

// Fcn to take an array of name s and remove white space
function cleanNames(arr) {
    return arr.map(function (name) {
        return name.trim();
    })
}

// ARROW FCNS! No internet explorer support. of course.
// const add = function (x, y) {
//     return x + y;
// }
// This is equivalent to the above syntax
const add = (x, y) => {
    return x + y;
}

// Parentheses optional if 1 argument
const square = x => {
    return x ** 2;
}
// Still need empty parentheses even if no arg
const print = () => {
    console.log("No args")
}

const greet = (name) => {
    return `Hey ${name}!`
}
// Arrow functions also have implicit returns!
// Only works w/ 1 liners
// Use () instead of {}
const returnMe = () => (
    5
)
// or even no paren!
// const returnMe = () => 5
console.log(`I did an implicit return! ${returnMe()}`)


// Using arrows in map
const num_sq_arrow = numbers.map(num => num ** 2)

// setTimeout. 1st arg fcn, 2nd arg ms delay
setTimeout(() => console.log("I'm delayed!"), 500)

// setInterval
const interval = setInterval(() => console.log(`Interval ${Math.random()}`), 500);
// Stops the interval fcn execution with id of 'interval'
setTimeout(() => clearInterval(interval), 2000)

// Filtering!
//  filter fcn must return a boolean
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(numbers.filter(n => n % 2 == 0))
// chaining! Filter and then execute a fcn on the filtered arr
console.log(numbers.filter(n => n % 2 == 0).map(n => n ** 2))

const validUserNames = (arr) => {
    return arr.filter(n => n.length < 10)
}

// every and some
// return bool to check for a condition
console.log(numbers.every(n => n < 5))  //false
console.log(numbers.some(n => n < 5))  //true

const allEvens = nums => nums.every(n => n % 2 === 0)

// Reduce
// Provide a reducer fcn that has 2 param
// First val is the accumulator, 2nd is the el in arr
const sum = numbers.reduce((accumulator, cur_num) => {
    return accumulator + cur_num;
});
console.log(sum)

// find min value of array w/ reduce
const min = numbers.reduce((min, num) => {
    if (num <= min) {
        return num;
    }
    return min;
})

// Can also pass an initial value!
// 2nd value is the initial fcn
const sum_w_initval = numbers.reduce((accumulator, cur_num) => {
    return accumulator + cur_num;
}, 10);
console.log(sum_w_initval)


// Arrow and this
// TL;DR "this" is different in arrow fcns
const person = {
    first: 'Chasen',
    last: 'Sherman',
    fullName: function () {
        console.log(`${this.first} ${this.last}`)
    },
    // inside of arrow, this refers to created scope. So window, global, etc.
    // This will go undefined
    fullArrow: () => {
        console.log(`${this.first} ${this.last}`)
    },
    // BUT IT WILL INHERIT. SO DUMB.
    shout: function () {
        setTimeout(() => {
            console.log(this.first.toUpperCase())
        }, 2000)
    }

}
person.fullName()
person.shout()