const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand',
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Mongo connection open')
    }).catch(err => {
        console.log(`${err} occurred while connecting to mongod!`)
    })

// Seed the database separately from the app
// Product.deleteMany({}).
//     then(d => {
//         console.log('Deleted!')
//     })

const p = new Product({
    name: 'Grapefruit',
    price: 1.25,
    category: 'Fruit',
})
p.save()
    .then(p => {
        console.log(p)
    }).catch(e => {
        console.log(e)
    })

const seeds = [
    {
        name: 'Tomato',
        price: 0.75,
        category: 'Vegetable',
    },
    {
        name: 'Radish',
        price: 0.15,
        category: 'Vegetable',
    },
    {
        name: 'Milk',
        price: 2.75,
        category: 'Dairy',
    },
    {
        name: 'Eggs',
        price: 4.75,
        category: 'Dairy',
    },
    {
        name: 'Apple',
        price: 1.00,
        category: 'Fruit',
    },
    {
        name: 'Pear',
        price: 1.05,
        category: 'Fruit',
    },
];

Product.insertMany(seeds)
    .then(res => {
        console.log(res)
    }).catch(e => { console.log(e) }) // note, all of the items must pass validation to insert by default