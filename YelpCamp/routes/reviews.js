const express = require('express');
const router = express.Router({ mergeParams: true });  // mergeparams now will pass id
const { isLoggedIn, isReviewAuthor } = require('../utils/auth');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const Review = require('../models/review');

const { reviewSchema } = require('../utils/schemas');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(e => e.message).join(',');
        throw new ExpressError(msg, 400)
    }
    return next();
}

router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res, next) => {
    const grounds = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    grounds.reviews.push(review)
    await grounds.save(); // TODO: parallelize saves
    await review.save();
    req.flash('success', 'Successfully reviewed the campground!');
    res.redirect(`/campgrounds/${grounds._id}`)
}))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res, next) => {
    const { id, reviewId } = req.params
    // remove the review from the db
    await Review.findByIdAndDelete(reviewId);
    // we need to then remove the reference to the deleted review
    // we can use '$pull' operator from mongo to remove from array
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash('success', 'Successfully deleted the review!');
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;
