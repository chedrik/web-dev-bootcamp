// imports
const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
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
app.engine('ejs', ejsMate);

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