const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const flash = require('connect-flash');
// with this, all reqs will have a session!
// cookie is connect.sid (session id)
app.use(session({
    secret: 'this-is-a-secret',
    resave: false, // session complains and wants a val
    saveUninitialized: false, // also complains and wants a val
}));
app.use(flash());

app.set('views', __dirname);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Session is stored on the server!!!!!
// By default, its stored in memory(MemoryStore) (this is nono good for prod)
// ^ it will leak memory


// better flash mechanism, give every req access to messages
app.use((req, res, next) => {
    // now available in the template still as 'messages' w/o passing through
    res.locals.messages = req.flash('info');
    next();
})


app.get('/viewcount', (req, res) => {
    // req object now has a session object!
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    // All of the vars in the session dont exist until you initialize

    res.send(`Views: ${req.session.count} by ${req.session.username}`);
})


app.get('/register', (req, res) => {
    const { username = 'Anonymous' } = req.query;
    req.session.username = username;
    res.send('hi')
})

// very simple routes to test w/ flash
app.get('/flash', (req, res) => {
    // res.render('flash', { messages: req.flash('info') })  // pass the flash obj
    res.render('flash')  // pass the flash obj implicit w/ middleware
})

app.post('/flash', (req, res) => {
    // Now all requests will have a req.flash() method bc of the middleware
    req.flash('info', 'hi')
    res.redirect('flash')
})


app.listen(3000, () => {
    console.log('lets ride')
})
