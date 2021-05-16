const mongoose = require('mongoose');

// const categories = ['Fruit', 'Vegetable', 'Dairy']

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: { // assumption, price per item
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        enum: ['Fruit', 'Vegetable', 'Dairy'], // TODO: this should be the same as the categories in index.js
    }
})

const Product = mongoose.model('Project', productSchema);

module.exports = Product;