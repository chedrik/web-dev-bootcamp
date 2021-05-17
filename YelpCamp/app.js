// imports
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

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



// routes
app.get('/', (req, res) => {
    res.render('home')
})



app.listen(3000, () => {
    console.log('Express app started on port 3000')
})