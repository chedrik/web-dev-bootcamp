// Realized I hadn't been copy-pasting lots of the JS excercises
// from udemy into the scripts... tried to get back to that here!

// You can use it before defining due to hoisting
dummyFunction()
function dummyFunction() {
    console.log('You made a function!!')
}
dummyFunction()


// arguments
function sayHi(user) {
    console.log(`Hi ${user}`)
}
sayHi('Chasen')

// You dont have to pass an arg. 
// Default is to undefined
sayHi() // Hi undefined

function printHeart() {
    console.log("<3")
}
printHeart()

function rant(message) {
    console.log(message.toUpperCase())
    console.log(message.toUpperCase())
    console.log(message.toUpperCase())
}
rant("I hate beets")

// Multiple args as usual
// Order matters, not like kwarg
function add(x, y) {
    console.log(`${x} + ${y} is ${x + y}`)
}
add(1, 2)

// define isSnakeEyes below:
function isSnakeEyes(d1, d2) {
    if (d1 === 1 && d2 === 1) {
        console.log("Snake Eyes!")
    } else {
        console.log("Not Snake Eyes!")
    }
}

// Returning a value!
// Return exits the function
// Can only return a single value. If needed, return an array / obj
function addAndReturn(x, y) {
    return `${x} + ${y} is ${x + y}`
}
const val = addAndReturn(1, 2);
console.log(val)

// Excercises
function multiply(x, y) {
    return x * y
}

function isShortsWeather(temp) {
    if (temp >= 75) {
        return true
    } else {
        return false
    }
}

function lastElement(arr) {
    if (arr.length === 0) {
        return null
    } else {
        return arr[arr.length - 1]
    }
}

function capitalize(str) {
    let new_str = '';
    new_str = str[0].toUpperCase() + str.slice(1)
    return new_str
}

function sumArray(arr) {
    let total = 0;
    for (let val of arr) {
        total += val
    }
    return total
}

function returnDay(num) {
    const days = ['not_a_day', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    if (num < 1 || num > 7) {
        return null
    } else {
        return days[num]
    }
}
