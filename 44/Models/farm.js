// One to many
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


const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter'],
    }
})

const Product = mongoose.model('Product', productSchema);

// const r = Product.insertMany([
//     { name: 'Melon', price: 5.0, season: 'Summer' },
//     { name: 'Orange', price: 2.0, season: 'Summer' },
//     { name: 'Apple', price: 1.0, season: 'Fall' },
// ])

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    // one to many relationship w/ object ID!
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // name of the model we're relating to
        }
    ],
})

const Farm = mongoose.model('Farm', farmSchema);

const makeFarm = async () => {
    const farm = new Farm({ name: 'Farmville', city: 'My house' });
    const melon = await Product.findOne({ name: 'Melon' });
    // mongoose knows to only push the ID
    farm.products.push(melon)
    await farm.save()
    // mongoose will show the whole item, but if you look in the mongodb shell
    // it is only the ide.
    console.log(farm)
}
// makeFarm();

const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Farmville' });
    const apple = await Product.findOne({ name: 'Apple' });
    farm.products.push(apple);
    await farm.save();
    console.log(farm)
}
// addProduct();

// how do I also get the product info itself, and not just the ObjectID?
Farm.findOne({ name: 'Farmville' })
    .then(farm => console.log(`No populate: ${farm}`))

// with populate! specify populate(data name)
// Note that you have you use the 'ref' for this to work!
Farm.findOne({ name: 'Farmville' })
    .populate('products') // note this is the data name, not the ref model name
    .then(farm => console.log(`Populated: ${farm}`))