// Is naming this node.js too meta
// Node is a JS runtime, whereas for frontend the browser is the runtime env
// Why node?
//  --> web servers, cli, native apps (like vscode!), video games, ie. everything.

// Node has a REPL if you run $node
// exit with $.exit

// top level functions live in 'global' instead of 'window'
// console.log(global)

// can execute a file with
// $node <file.js>

// Process is an object in global scope.  
// Contains things like version, inputs, cli, memory,etc.

// Handling cli args!
console.log(process.argv)
// first argv is node path, 2nd is the file executing, then the rest is args
for (let i = 2; i < process.argv.length; i++) {
    console.log(`hi ${process.argv[i]}`)
}  // says hi to all user arguments!

// File system module (fs)
const fs = require('fs');
console.log(fs)
// sample boilerplate generator with proccess.argv
function makeBoilerplate(args) {
    // many fcns have both sync and async fcns!
    const folder = args[2] || 'Project';
    fs.mkdirSync(folder);
    fs.writeFileSync(`${folder}/index.html`)
    fs.writeFileSync(`${folder}/app.js`)
    fs.writeFileSync(`${folder}/app.css`)
    // should obviously have error handling also, etc.
}