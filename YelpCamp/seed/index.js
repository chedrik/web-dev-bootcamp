// This file is to be standalone, so it needs to handle mongodb connection
//  and model import

const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'Error connecting to mongodb to seed:'));
mongoose.connection.once('open', () => {
    console.log('Successfully connected to mongodb to seed')
})

const seedDB = async (numToSeed = 50) => {
    await Campground.deleteMany({});
    for (let i = 0; i < numToSeed; i++) {
        const rand = Math.floor(Math.random() * 1000); // 1000 cities in the seed file
        const camp = new Campground({
            title: `${getRandElement(descriptors)} ${getRandElement(places)}`,
            location: `${cities[rand].city},${cities[rand].state}`,
        })
        await camp.save()
            .then(console.log(`Done seeding site ${i + 1}`))
    }
}

const getRandElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    })
