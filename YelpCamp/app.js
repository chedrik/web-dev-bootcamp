// imports
const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

mongoose.connection.on('error', console.error.bind(console, 'Error connecting to mongodb:'));
mongoose.connection.once('open', () => {
    console.log('Successfully connected to mongodb')
})


// express middleware
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))) // how to serve static assets
app.engine('ejs', ejsMate);

const sessionConfig = {
    secret: 'not-a-real-secret-yet',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // in ms, 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7, // in ms, 1 week
        httpOnly: true,
    }
}
app.use(session(sessionConfig))
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// routes
app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);  // by default, this id wont actually go into the review route...

app.get('/', (req, res) => {
    res.render('home')
})

// any request, any url. IE. generic 404
app.all('*', (req, res, next) => {
    next(new ExpressError('404 - Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = 'Server error'
    res.status(status).render('error', { err })
})

app.listen(3000, () => {
    console.log('Express app started on port 3000')
})