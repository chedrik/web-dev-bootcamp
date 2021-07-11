if (process.env.NODE_ENV !== "production") {
    // This now puts all env variables into process.env
    require('dotenv').config();
}
// imports
const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const ExpressError = require('./utils/ExpressError');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

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
// urlencoded here will not allow us to upload images!
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))) // how to serve static assets
app.engine('ejs', ejsMate);
app.use(mongoSanitize({
    replaceWith: '_'
}))
app.use(helmet()); // uses all helmet mw!

////// copied and modified from colt ////////
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com",
    "https://api.tiles.mapbox.com",
    "https://api.mapbox.com",
    "https://kit.fontawesome.com",
    "https://cdnjs.cloudflare.com",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com",
    "https://stackpath.bootstrapcdn.com",
    "https://api.mapbox.com",
    "https://api.tiles.mapbox.com",
    "https://fonts.googleapis.com",
    "https://use.fontawesome.com",
    "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [
    "https://api.mapbox.com",
    "https://*.tiles.mapbox.com",
    "https://events.mapbox.com",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            childSrc: ["blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/chedrik/",
                "https://images.unsplash.com",
                "https://trumpwallpapers.com",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);
////// end of copied and modified from colt ////////

const sessionConfig = {
    name: 'definitely-not-a-session', // changes the default session name instead of connect.sid
    secret: 'not-a-real-secret-yet',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // in ms, 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7, // in ms, 1 week
        httpOnly: true,  // not accesible through js!
        // secure: true, // makes cookie only work on https
    }
}
app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());  // needs to be after app.use(session())
// all 3 of the User fcns below are auto-added by the passport-local-mongoose pkg
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());  // how is it stored in session
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.user; // req.user is auto added as deserialized by passport
    next();
})

// routes
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);  // by default, this id wont actually go into the review route...
app.use('/', userRoutes);

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