const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const Campground = require('../models/campground');
const { cloudinary } = require('../cloudinary');

const mbxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mbxToken });

module.exports.index = async (req, res, next) => {
    const grounds = await Campground.find({});
    res.render('campgrounds/index', { grounds })
};

module.exports.newForm = (req, res) => {
    res.render('campgrounds/new')
};

module.exports.createCampground = async (req, res, next) => {
    const grounds = new Campground(req.body.campground);

    const geoResponse = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()

    grounds.author = req.user._id;
    grounds.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    grounds.geometry = geoResponse.body.features[0].geometry; // geojson [LONG, LAT]

    await grounds.save();
    req.flash('success', 'Created a new campground!');
    res.redirect(`/campgrounds/${grounds._id}`)
};

module.exports.showCampground = async (req, res, next) => {
    const { id } = req.params;
    const grounds = await Campground.findById(id)
        .populate({ path: 'reviews', populate: { path: 'author' } })  // review author
        .populate('author');  // cg author
    if (!grounds) {  // if the id is not the right format, this will fail prior to if statement
        req.flash('error', 'Campground not found!')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { grounds })
};

module.exports.editForm = async (req, res, next) => {
    const { id } = req.params;
    const grounds = await Campground.findById(id);
    if (!grounds) {
        req.flash('error', 'Campground not found!')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { grounds })
};

module.exports.updateCampground = async (req, res, next) => {
    const { id } = req.params;
    const grounds = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { runValidators: true, new: true });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    grounds.images.push(...imgs);
    await grounds.save(); // TODO: sub-optimal to find and update twice

    if (req.body.deleteImages) {
        for (let f of req.body.deleteImages) {
            await cloudinary.uploader.destroy(f);
        }
        // TODO: can this be updated in the area and then 1 save?
        await grounds.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    res.redirect(`/campgrounds/${grounds._id}`)
}

module.exports.deleteCampground = async (req, res, next) => {
    const { id } = req.params;
    const grounds = await Campground.findByIdAndDelete(id);
    for (let f of grounds.images) {
        await cloudinary.uploader.destroy(f.filename);
    }
    req.flash('success', 'Successfully deleted the campground!');
    res.redirect('/campgrounds')
};