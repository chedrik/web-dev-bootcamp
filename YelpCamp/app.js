// imports
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
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
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));


// routes
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {
    const grounds = await Campground.find({});
    res.render('campgrounds/index', { grounds })
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

app.post('/campgrounds', async (req, res) => {
    const grounds = new Campground(req.body.campground);
    await grounds.save();
    res.redirect(`/campgrounds/${grounds._id}`)
})

app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const grounds = await Campground.findById(id);
    res.render('campgrounds/show', { grounds })
})

app.get('/campgrounds/:id/edit', async (req, res) => {
    const { id } = req.params;
    const grounds = await Campground.findById(id);
    res.render('campgrounds/edit', { grounds })
})

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const grounds = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { runValidators: true, new: true });
    res.redirect(`/campgrounds/${grounds._id}`)
})

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const ground = await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds')
})

app.listen(3000, () => {
    console.log('Express app started on port 3000')
})