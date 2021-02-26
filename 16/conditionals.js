// Nominal
console.log(6 > 4)
console.log(4 < 5)
console.log(4 >= 4.0)
console.log(-1 <= 0)
console.log('a' < 'b')
console.log('A' < 'a')

// Typical equality. It will "coerce" the type
console.log('5' == '5')
console.log('5' == 5)
console.log(0 == false)

// Strict equality, no type conversion!
console.log('5' === '5')
console.log('5' === 5)
console.log(0 === false)

// IFS
let rand = Math.random();
if (rand < 0.5) {
    console.log(`math makes small numbers ${rand}`)
} else if (rand > 0.5) {
    console.log('big num')
} else {
    console.log('Precisely 0.5')
}

// const password = prompt("please enter a string")
// // pass must be 6+ char
// // pass cannot include space
// if (password.length >= 6) {
//     if (password.indexOf(" ") === -1) {
//         console.log("Password can't contain a space!")
//     } else {
//         console.log("Good password")
//     }
// } else {
//     console.log("Password is too short! 6+ Needed")
// }

// Truthyness and falsyness
// false, 0, "",null, undefined, NaN are false. Else, true!
if ("") {
    console.log("This won't happen because its falsy!")
}

// Logical && || !
true && true
false || true
!false