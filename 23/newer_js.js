// Default params
// args then kwargs, just like py
function rollDie(numSides = 6) {
    // old way
    // if (numSides === undefined) {
    //     numSides = 6
    // }
    return Math.floor(Math.random() * numSides) + 1;
}

// spread exapnds iterables
//  ...iterable expands in place
console.log(`No spread ${Math.max([0, 5, 10])}`)
console.log(`Spread! ${Math.max(...[0, 5, 10])}`)

const arr = [0, 1, 2, 3];
const arr2 = [4, 5, 6, 7];
// useful for copying or combining
const comb = [...arr, ...arr2];
console.log(comb)

const cs = { last: 'Sherman', first: 'Chasen' };
const go = { last: 'Ozturk', first: 'Gulce' };
// Note that go will override any conflict. Sort of like a right join
console.log({ ...cs, ...go })
console.log({ ...cs, house: 'new' })

// rest
// arguments is array-like obj in fcn
// collects all args not specified into an array
function sum(...nums) {
    console.log(arguments)
    console.log(nums)
}
sum(1, 2, 3)

// destructuring
// arrays
const example = ['a', 'b', 'c', 'd', 'e'];
const [fir, second, ...theRest] = example;
console.log(fir, second)
// objects
const csFirst = cs.first; // Not destructuring
const { first } = cs; // var name is first
const { first: newVarName } = cs; // var name is newVarName
const { default: defaultVar = 'blah' } = cs;  // default value if prop doesnt exist
// function param destructure
// function returnName(user) {
//     return user.first
// }
// Can destructure directly in the arg
function returnName({ first }) {
    return first
}