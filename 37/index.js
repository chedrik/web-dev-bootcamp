const mongoose = require('mongoose');

// The last part is the db name to connect to
mongoose.connect('mongodb://localhost:27017/movieApp',
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Connection open')
    }).catch(err => {
        console.log(`${err} occurred!`)
    })

// models are JS classes, typically 1x per collection

// schema here is only on the JS side, doesnt touch db
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String,
})

// This will create a collection called movies
// Should pass an upper case singular string
const Movie = mongoose.model('Movie', movieSchema);

// This obj does not yet save to db, its only in js
const Scarface = new Movie({ title: 'Scarface', year: 1990, score: 9.8, rating: 'R' });

// Now its in the DB!
Scarface.save().then(() => {
    console.log('Saved scarface!')
}).catch(err => {
    console.log(`${err} occurred while saving scarface!`)
})

// this saves directly to mongo w/o the explicit save step
// <Model>.insertMany([{}])
Movie.insertMany([
    { title: 'Shining', year: 1980, score: 9.0, rating: 'R' },
    { title: '2001', year: 2001, score: 9.4, rating: 'R' },
    { title: 'Batman', year: 2005, score: 9.2, rating: 'PG-13' },
    { title: 'Spongebob', year: 2003, score: 7.1, rating: 'PG' }
]).then(() => {
    console.log('Saved the additional movies!')
}).catch(err => {
    console.log(`${err} occurred while saving move movies!`)
})

// finding!
// provides the same query structures as mongo shell
// Can treat the results of this 'like' a promise, even though they technically arent.
// They are considered 'thenable' objects
Movie.find({}).then(data => {
    console.log(data) // note that this is an array
})

Movie.findOne({}).then(data => { // this will just yield the first res.
    console.log(data) // note that this is NOT an array
})

// Very common for routes w/ the id in the name for example
Movie.findById('6097ece379c05927d56b7efa').then(data => {
    console.log(data)
})

// Updates
Movie.updateOne({ '_id': '6097ece379c05927d56b7efa' }, { year: 1980 }).then(res => {
    console.log(res) // modify, will give 'nModified'
})

// instead, can find something and update and return the object instead of the 'modified' info
// Returns the old one by default... if you want the updated one, you have to use 'new'
Movie.findOneAndUpdate({ 'title': 'Spongebob' }, { 'rating': 'G' }, { new: true }).then(res => {
    console.log('Updated vvvvv')
    console.log(res)
})

// Deletes
Movie.deleteOne({ 'title': '2001' })
// If you want the data back that you deleted, use the findOne
Movie.findOneAndDelete({ 'title': 'Batman' }).then(m => {
    console.log(`Deleted ${m}`)
})

// how does the rest of the code work after the connection?
// "Operation buffering" allows us to not nest in the connect callback
