const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res, next) => {
    const grounds = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    grounds.reviews.push(review)
    await grounds.save(); // TODO: parallelize saves
    await review.save();
    req.flash('success', 'Successfully reviewed the campground!');
    res.redirect(`/campgrounds/${grounds._id}`)
};

module.exports.deleteReview = async (req, res, next) => {
    const { id, reviewId } = req.params
    // remove the review from the db
    await Review.findByIdAndDelete(reviewId);
    // we need to then remove the reference to the deleted review
    // we can use '$pull' operator from mongo to remove from array
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash('success', 'Successfully deleted the review!');
    res.redirect(`/campgrounds/${id}`)
};