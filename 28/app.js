const sample = '{"name":"John", "age":31, "city":"New York"}';

// parse the json string -> obj
const parsedSample = JSON.parse(sample);
console.log(parsedSample.name)

// or, vice versa from obj -> json
const stringed = JSON.stringify(parsedSample);
console.log(stringed)
console.log(sample)

// postman is a good tool to use for API stuff

// query strings start with ?q:blah
// colon then val is typically variable in an api doc.
// ex: ?q:query ==> ?q=thesearchstring?anotherkey=anotherval


// old style of requests with XMLHttpRequest.  (XHR)
// super annoying and ugly
const req = new XMLHttpRequest();
req.onload = function () {
    console.log('done w/ req!')
    console.log(this.responseText);
}
req.onerror = function () {
    console.log('error!')
}
req.open('get', 'https://api.cryptonator.com/api/ticker/btc-usd')
req.send();

// Fetch API!
// not supported in IE lol
// It returns a promise, but it resolves immediately when the header is received
// this can be a problem because the body may not be ready...
// so if you use the .json() method ==> returns another promise!
fetch('https://api.cryptonator.com/api/ticker/btc-usd')
    .then(res => {
        console.log('response', res)
        return res.json() // this is a promise
    })
    .then(data => {
        console.log('this is the parsed data', data)
    })
    .catch(e => {
        console.log('error', e)
    })

// fcn version
const fetchData = async () => {
    try {
        const res = await fetch('https://api.cryptonator.com/api/ticker/btc-usd');
        const data = await res.json();
        console.log(data)
    } catch (e) {
        console.log('wrong!')
    }
}

// Axios - library built on top of fetch