const Campground = require('../models/campground');
const Review = require('../models/review');
const ExpressError = require('../utils/ExpressError');
const { reviewSchema, campgroundSchema } = require('../utils/schemas');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {  // fcn is included in all req by passport!
        req.flash('error', 'You must be signed in.');
        req.session.returnTo = req.originalUrl;  // for redirect!
        return res.redirect('/login');
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const grounds = await Campground.findById(id);
    if (!grounds.author.equals(req.user._id)) {
        req.flash('error', "You don't have permissions to do that!")
        return res.redirect(`/campgrounds/${id}`)
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId, id } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', "You don't have permissions to do that!")
        return res.redirect(`/campgrounds/${id}`)
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(e => e.message).join(',');
        throw new ExpressError(msg, 400)
    }
    return next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        // creates single error string for everything
        const msg = error.details.map(e => e.message).join(',');
        throw new ExpressError(msg, 400)
    }
    return next();
}