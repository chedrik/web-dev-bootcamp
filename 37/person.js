const mongoose = require('mongoose');

// The last part is the db name to connect to
mongoose.connect('mongodb://localhost:27017/personApp',
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Connection open')
    }).catch(err => {
        console.log(`${err} occurred!`)
    })

const personSchema = new mongoose.Schema({
    first: String,
    last: String,
})
// VIRTUALS
// It's not actually an item / field in the db
// has a getter and a setter functionality, optioanlly.
personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`
})
// setter would make it so that setting fullname would update the db first and last
// this behaves as a property, vs. an instance method which needs to be called


// middleware! Can define pre/post callbacks for different methods.
personSchema.pre('save', async function () {
    console.log('About to save')
})

personSchema.post('save', async function () {
    console.log('Just finished save')
})


const Person = mongoose.model('Person', personSchema);

const chasen = new Person({ first: 'Chasen', last: 'Sherman' });
chasen.save()
console.log(chasen.fullName)