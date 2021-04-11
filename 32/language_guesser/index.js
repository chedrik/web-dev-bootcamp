const franc = require('franc');
const langs = require('langs');

const input = process.argv[2];
if (!input) {
    throw 'Expected input text to translate! Provide CLI arg';
}

const code = franc(input);
if (code === 'und') {
    throw 'Could not figure out the language! Try a longer sentence(s)';
}

const language = langs.where("3", code);
if (!language) {
    throw 'Could not figure out the language! Try a longer sentence(s)';
}
console.log(language.name);
