const express = require('express');
const router = express.Router({ mergeParams: true });  // mergeparams now will pass id
const { isLoggedIn, isReviewAuthor, validateReview } = require('../utils/middleware');
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews')


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
