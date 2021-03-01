// For loops
for (let i = 1; i <= 10; i++) {
    console.log(i)
}

// increment expression takes any expression as usual
for (let i = 0; i < 21; i += 2) {
    console.log(i)
}

// Array iteration
const arr = ['a', 'b', 'c', 'd', 'e', 'f'];
// boooo
for (let i = 0; i < arr.length; i++) {
    console.log(i, arr[i])
}
// Direct iteration, but Not support in IE.... lol
for (let letter of arr) {
    console.log(letter)
}

// Can iterate over anything which is iterable (maps, sets, arrs)
for (let char of "string") {
    console.log(char)
}

// Nesting loops is the same as other languages
for (let i = 0; i < arr.length; i++) {
    console.log(i, arr[i], 'outter')
    for (let j = 0; j < arr.length; j++) {
        console.log(j, arr[j], 'inner')
    }
}

// While loops
let num = 0;
while (num < 5) {
    console.log('While loopin')
    num++
    // Trivial example showing break
    if (num > 2) {
        break;
    }
}

// object iterations, cant use for... of...
// object literals are not iterables
const prices = {
    'apple': 1,
    'pear': 2,
    'melon': 6,
    'juice': 1,
}
for (let item in prices) {
    console.log(`${item} costs ${prices[item]}`)
}
// OR, Object.values(obj), Object.keys(obj), Object.entries(obj)
// give arrays, and those can be iterated upon w/ for of

// EX. get average price
let p = 0;
for (let price of Object.values(prices)) {
    p += price
}
console.log(p / Object.values(prices).length)



