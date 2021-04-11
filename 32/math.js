// Contents of this file are not automatically included when another file 'requires'

// Can add the fcn directly to mdodule exports
module.exports.add = (x, y) => x + y;

module.exports.PI = 3.14159;

module.exports.square = x => x * x;

// This is what is actually exported when another file 'requires'
// module.exports object

// alternatives
// module.exports.add = add;
// module.exports.PI = PI;
// module.exports.square = square;

// const math = {
//     add: add,
//     PI: PI,
//     square: square
// }
// module.exports = math;

// also cna use 'exports' as shorthand instead of module.exports


