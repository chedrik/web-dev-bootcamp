// One to few
const mongoose = require('mongoose');

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/relationshipDemo', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'Error connecting to mongodb:'));
mongoose.connection.once('open', () => {
    console.log('Successfully connected to mongodb')
})


const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    // example: 1:few. Embed into the document
    addresses: [
        // Each address get's its own _id (although cn be turned off)
        // It's treated as an embedded schema
        {
            _id: { id: false }, // to disable _id index
            street: String,
            city: String,
            state: String,
            country: String,
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Chasen',
        last: 'Sherman',
    })
    u.addresses.push({
        street: '123 Drury Lane',
        city: 'Muffin Town',
        state: 'CA',
        country: 'USA',
    })
    const res = await u.save()
    console.log(res)
}

User.deleteMany({})
makeUser()
