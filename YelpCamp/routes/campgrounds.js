const express = require('express');
const multer = require('multer');  // mw for file handling

const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const { storage } = require('../cloudinary');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../utils/middleware');

const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgrounds.index))
    // TODO: validatecampground should happen before multer, but we need the data from multer to validate & create
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.newForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editForm));

module.exports = router;
