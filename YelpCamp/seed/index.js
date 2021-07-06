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
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            title: `${getRandElement(descriptors)} ${getRandElement(places)}`,
            price: price,
            location: `${cities[rand].city},${cities[rand].state}`,
            image: 'https://source.unsplash.com/collection/9822900',  // random image for seed
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, magni! Temporibus vero dicta animi aperiam similique ex dignissimos impedit veritatis ratione maxime in eligendi suscipit molestias quidem delectus, facilis consequuntur.',
            author: '60e3738170db0647135fa31d',  // matched to cs
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
