// Objects in JS can be though of as a collection of properties that are k:v pairs

// Discussing things as 'object literals'
const my_obj = {
    key1: 5,
    key2: 'red',
    key3: [0, 1, 2],
};

console.log(typeof (my_obj))
console.log(my_obj)

// Access with brackets or dot notation
console.log(my_obj.key3[1])
console.log(my_obj['key1'])
// Keys not in the obj will yield undefined
console.log(my_obj['tertwe'])

// Keys are all typecast to strings!!!!!! (other than symbols)
const weird = {
    1: "value"
}
// and yet....
console.log(weird[1] === weird['1'])

// Modifying w/ the same syntax as reading
my_obj.key4 = 'new val'