const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema; // shorthand

// virtual property to enable cloudinry transform
const ImageSchema = new Schema({
    url: String,
    filename: String,
})

// remember, virtual isnt actually stored in mongo! just a fcn
ImageSchema.virtual('thumbnail').get(function () {
    // "this" refers to the specific image
    return this.url.replace('/upload', '/upload/w_200'); // 200px transform
})

const options = { toJSON: { virtuals: true } };  // virtual not stringified by default

const CampgroundSchema = new Schema({
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    },
    images: [ImageSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }
    ]
}, options);

// nested popUpMarkup under properties for cluster map
CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    // "this" refers to the specific cg
    return `<strong><a href='/campgrounds/${this._id}'>${this.title}</a></strong><p>${this.description.substring(0, 20)}...</p>`
})

CampgroundSchema.post('findOneAndDelete', async function (grounds) {
    if (grounds) {
        if (grounds.reviews.length) {
            await Review.deleteMany({ _id: { $in: grounds.reviews } })
        }
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);