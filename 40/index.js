const express = require('express');
const app = express();
const morgan = require('morgan');

// app.use(() => {
//     console.log('hey') // this is generic middelware. executes on every request!
// But this wont move on to the next mw, so it will hang
// })

app.use(morgan('tiny')) // will log every req!

// When you call next() this moves on to the next middleware
app.use((req, res, next) => {
    console.log('my middleware!');
    next(); // you have to call this or its the end of the line!
    // this will execute, but after the next middleware does
    console.log('my middleware after next!');
})

// executes in the order defined
app.use((req, res, next) => {
    console.log('my 2nd middleware!');
    return next(); // you can also return as a convention
})


// example authetnication type of thing
// where maybe a password is in the query string
// ^ OBVIOUSLY THIS IS BAD PRACTICE
app.use('/hi', (req, res, next) => {
    const { password } = req.query;
    if (password == 'hi') {
        next();
    } else {
        res.send('password is wrong!')
    }
    // return next(); // you can also return as a convention
})


// can also define a mw as a function and pass on the route itself
const mwFunction = (req, res, next) => {
    console.log('mw from a function!')
    return next();
}

// can also specify what routes to use the middleware on!
// this can be a regex or something more complex
app.use('/hi', (req, res, next) => {
    console.log('this is also only hi');
    return next();
})

// essentially the 'next' fcn is the typical (req,res) callback
app.get('/', mwFunction, (req, res) => {
    res.send('Home')
})

// the order matters!
// this middleware is only on the /hi route and not the home route
app.use((req, res, next) => {
    console.log('my hi middleware!');
    return next();
})

app.get('/hi', (req, res) => {
    res.send('hi')
})


// Putting this at the end will treat it as a 404
// checks all other MW and routes, then gets to this
app.use((req, res, next) => {
    res.status(404).send('this is my 404!')
})

app.listen(3000, () => {
    console.log('Listening');
})