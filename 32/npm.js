// How do I get the math.js fcns into this one?
const math = require('./math');  // ./ needed to specify where to find the file

console.log(math)

// how do I require a whole directory? Same way!
// Requires an index.js
const dir = require('./test');

// NPM = node package manager
// can run from command line with $npm

// how to install?
//     npm install <package>
// This creates node_modules folder in the install directory
// Also creates package-lock.json

// How to require?
// require("<package>"), which automatically looks in the node_modules folder

// local vs global package installs
// things are installed locally by default, unless you use "-g" flag
//    $ npm i -g cowsay (example)
//    $ npm link <global_package>

//////////////////
// package.json
// One for every node app!
// Contains metadata for the application (deps, authors, license, etc..)
// Make the package.json with
//     $ npm init
// After this, every install will update this file automatically


// How to install deps from package.json?
// cd into the package.json directory and $ npm install 
// No arguments to npm install --> search for deps in package.json