let colors = [];
// Lists do not need to be homogeneous
let list = ['apple', 'banana', 'cookie', 'dog', 5];

// Lists are 0 indexed (Matlab D:<)
console.log(list[0])
console.log(list.length)
// Accessing out of range will yield undefined
console.log(list[5000])

// Can reassign whenever, unlike string.
list[0] = 'new val'
console.log(list)

// How to append? Push, or list[length]
list[list.length] = 'append'
console.log(list)
list.push('pushed')
console.log(list)

// Push / pop are from the end
let a = list.pop()
console.log(list)
console.log(`Popped: ${a}`)

// Shift / unshift from the start. Shift removes, unshift puts
let newVal = list.shift();
console.log(list)
console.log(`Shifted: ${newVal}`)
list.unshift('first')
console.log(list)

// Concat does not modify the array, it creates a new one
let a1 = [1, 2, 3];
let a2 = a1.concat([4, 5, 6]);
console.log(a2)

// Optionally pass a starting index to search from
console.log(a2.includes(2))

// Analagous to string version
console.log(a2.indexOf(2))

// Reverse is destructive & operates in place.
console.log(a2.reverse())
console.log(a2)

// slice gets a copy of portion. Optionally start & end idx. 
// No values -> copy of array
console.log(a2.slice(0, 2))

// Splice inserts / removes / replace. It is destructive / in place
let nums = [0, 1, 3, 4, 5];
nums.splice(1, 1)
console.log(nums)
// Can insert as many items as desired
nums.splice(1, 0, 1, 2)
console.log(nums)

// sorting takes a function. 
// array.sort() is dumb. Converts all val -> str and compares string values
let scores = [0, 50, 100, -100, 75];
console.log(`Sort is dumb w/o a comparator fcn because this is sorted: ${scores.sort()}`)

// comparing array is comparing the reference of the array, not the array itself
if (!([1] === [1])) {
    console.log('Array comp')
}

// const with arrays means that the reference wont be re-assigned
// You can do anything modification wise as long as no reassignment
// Safe way to ensure the object will always exist
const constant = [1, 2, 3];
constant.pop()
constant.push(5)
// constant = [1, 2] This will error!

// Nested arrays can work for 2d
const grid = [['X', 'O', 'X'], ['O', null, 'X'], ['O', 'O', 'X']];
grid[1][1] = 'X'
console.log(grid)