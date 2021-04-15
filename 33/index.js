// Library vs framework
// Lib we control flow of app (ie. bootstrap)
// Framework, we participate but the framework controls flow

const express = require("express");

const app = express();


// This callback will run anytime there's a request 
// regardless of the method
// req is incoming, res is outgoing. Passed automatically
// app.use((req, res) => {
//     console.log('Request received')

//     // how to send response? res.send()!
//     // Will accept string, objects, etc. Objs converted to json automatically
//     // res.send('Hi')
// })

// Get takes a route, and a callback
app.get('/cats', (req, res) => {
    res.send('Meow!')
})
app.get('/dogs', (req, res) => {
    res.send('Woof!')
})
app.get('/', (req, res) => {
    res.send('You are home!')
})

// What if you want to use pattern matching instead of specific url?
// use a colon
app.get('/r/:subreddit', (req, res) => {
    // The data in colon can be round in res.params
    res.send(`Welcome to ${req.params.subreddit} subreddit!`)
})


// Query strings!
// Req.query automatically gets this info, and then you get each info with .<info>
app.get('/search', (req, res) => {
    console.log(req.query)
    const { q } = req.query;
    if (!q) {
        res.send('You didnt search for anything!')
    }
    res.send(`hi. You searched for ${req.query.q}`)
})

// Express auto has a 404 by default, but you can override
// NOTE**** THE ORDER MATTERS. If you place this before other routes, it will take this route first
app.get('*', (req, res) => {
    res.send('New 404')
})

// post example
app.post('/cats', (req, res) => {
    console.log('post request received on cats!')
})


// Note that this fcn is blocking for finishing execution
// Because it's listening for requests :)
app.listen(3000, () => {
    console.log('Listening!')
})


