const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema; // shorthand

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
    images: [
        {
            url: String,
            filename: String,
        }
    ],
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
});

CampgroundSchema.post('findOneAndDelete', async function (grounds) {
    if (grounds) {
        if (grounds.reviews.length) {
            await Review.deleteMany({ _id: { $in: grounds.reviews } })
        }
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);