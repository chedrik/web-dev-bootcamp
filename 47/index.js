const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// pass a secret string for signing if you want
app.use(cookieParser('mysecret'));

const shelterRoutes = require('./routes/shelters');
const dogRoutes = require('./routes/dogs');
const adminRoutes = require('./routes/admin');
// routers are like 'mini apps'

// can store them in different files w/ their own
// routes and mw, and then combine

// First arg is the prefix path to all of the paths used by the router
app.use('/shelters', shelterRoutes);
app.use('/dogs', dogRoutes);
app.use('/admin', adminRoutes);


// what about cookies?!?!
// Theyre stored in the browser, but can be deleted and stuff
// Used for stateful-ness between requests, but not neccesarily persistent info
// like a db would store

// Lets set the cookie
app.get('/setcookie', (req, res) => {
    res.cookie('name', 'Chasen');  // this is part of the res, but not the whole thing. Need to actually send a resp w/ the cookie
    // There are many more settings for expiration, domain, etc that can be set on a cookie

    // signing is like a checksum/
    // Not encrytped, but you can check for the valdiitiy
    res.cookie('fruit', 'grape', { signed: true });
    // value looks like s%3Agrape.iAFRE8iCRHWXRV8ttPvGw91hOZJMYJ5lSGfOMSmBiYo
    // Note that you can see 'grape' in there!

    res.send('Have a cookie!') // you can see the cookie in the browser dev tools now
})

// Lets use the cookie!
// Not included in express.... need another package
app.get('/greet', (req, res) => {
    console.log(req.cookies);
    // Default val b/c cookie may not be set
    const { name = 'Friend' } = req.cookies;

    // where do signed cookies go? into a diff attribute
    const { fruit = 'no fruit' } = req.signedCookies;

    res.send(`hi there ${name}, heard you like ${fruit}`)
})



app.listen(3000, () => {
    console.log('Listening')
})