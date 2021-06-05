const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./AppError');
// app.use(() => {
//     console.log('hey') // this is generic middelware. executes on every request!
// But this wont move on to the next mw, so it will hang
// })

app.use(morgan('tiny')) // will log every req!


// example authetnication type of thing
// where maybe a password is in the query string
// ^ OBVIOUSLY THIS IS BAD PRACTICE
app.use('/hi', (req, res, next) => {
    const { password } = req.query;
    if (password == 'hi') {
        next();
    } else {
        // res.send('password is wrong!')

        // i can throw an error here instead if desired
        // this throws that error, but with the same default stack trace behavior
        throw new AppError('password is wrong', 401)
    }
    // return next(); // you can also return as a convention
})


// can also define a mw as a function and pass on the route itself
const mwFunction = (req, res, next) => {
    console.log('mw from a function!')
    return next();
}

// essentially the 'next' fcn is the typical (req,res) callback
app.get('/', mwFunction, (req, res) => {
    res.send('Home')
})

// Error! HTTP response still comes through
// Defaults to generic 500 server error & the stack trace
app.get('/error', (req, res) => {
    chicken.fly();
})

app.get('/hi', (req, res) => {
    res.send('hi')
})

// another example
app.get('/admin', (req, res) => {
    throw new AppError("You're no admin!", 403)
})

// note that you have to have 'next' in the signature!
app.get('/async', async (req, res, next) => {
    // dummy async call
    await setTimeout(function () {
        // this wont work!! Express doesnt catch the error
        // throw new AppError("Async Error!", 500)

        // you have to pass the apperror -> next
        return next(new AppError("Async Error!", 499))
        // ^ Note that this doesnt stop the rest of execution unless you return
        res.send('async')
    }, 750);
})

// what about async errors that we dont produce?
app.get('/async2', async (req, res, next) => {
    // Wrap the whole thing in try, catch and pass ->
    try {
        chicken.fly()
    } catch (e) {
        next(e)
    }
})

// this can get tiring... what if we have a wrapper around things instead?
// now it trys, catches nd returns next every time
function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}
// now, if theres an error it automatically try, catches!
app.get('/wrapasync', wrapAsync(async (req, res, next) => {
    notreal.hi();
}))


// error handling middelwar with err, req, res, next
// this will only happen is an error is encountered
// app.use((err, req, res, next) => {
//     console.log('*********')
//     console.log('***ERR***')
//     console.log('*********')
//     // res.status(500).send('we got the err')
//     // calling next here NEEDS ERR TO BE PASSED
//     // this only calls the next error handling mw, not all mw
//     next(err)
// })

app.use((err, req, res, next) => {
    // default value needed to handle routes like /error, where AppError isnt thrown
    const { status = 500 } = err;
    const { message = 'ERROR!' } = err;
    res.status(status).send(message)
})

// Putting this at the end will treat it as a 404
// checks all other MW and routes, then gets to this
app.use((req, res, next) => {
    res.status(404).send('this is my 404!')
})

app.listen(3000, () => {
    console.log('Listening');
})