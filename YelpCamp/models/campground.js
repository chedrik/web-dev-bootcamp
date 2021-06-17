const mongoose = require('mongoose');
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
    image: {
        type: String,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }
    ]
});

module.exports = mongoose.model('Campground', CampgroundSchema);