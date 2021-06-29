const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');

const { campgroundSchema } = require('../utils/schemas');


const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        // creates single error string for everything
        const msg = error.details.map(e => e.message).join(',');
        throw new ExpressError(msg, 400)
    }
    return next();
}

router.get('/', catchAsync(async (req, res, next) => {
    const grounds = await Campground.find({});
    res.render('campgrounds/index', { grounds })
}))

router.get('/new', (req, res) => {
    res.render('campgrounds/new')
})

router.post('/', validateCampground, catchAsync(async (req, res, next) => {
    const grounds = new Campground(req.body.campground);
    await grounds.save();
    req.flash('success', 'Created a new campground!');
    res.redirect(`/campgrounds/${grounds._id}`)
}))

router.get('/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const grounds = await Campground.findById(id).populate('reviews');
    if (!grounds) {  // if the id is not the right format, this will fail prior to if statement
        req.flash('error', 'Campground not found!')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { grounds })
}))

router.get('/:id/edit', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const grounds = await Campground.findById(id);
    if (!grounds) {
        req.flash('error', 'Campground not found!')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { grounds })
}))

router.put('/:id', validateCampground, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const grounds = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { runValidators: true, new: true });
    res.redirect(`/campgrounds/${grounds._id}`)
}))

router.delete('/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const grounds = await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the campground!');
    res.redirect('/campgrounds')
}))

module.exports = router;