const mongoose = require('mongoose');
const { Schema } = mongoose;
const Product = require('./product');
const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Farm must have a name'],
    },
    city: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Farm must have an email'],
    },
    // two way relationship based on view needs
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }
    ]
})

// we have to setup a middleware here to handle the relationships
// pre or post?
// findOneAndDelete is called by findbyidanddelete
farmSchema.pre('findOneAndDelete', async function (data) {
    console.log('pre-delete middleware')
    console.log(data)
    // ^ note that data here doesnt have the farm data
})

farmSchema.post('findOneAndDelete', async function (data) {
    console.log('post-delete middleware')
    console.log(data)
    // now we have access to the data from the query!
    if (data.products.length) {
        await Product.deleteMany({ _id: { $in: data.products } })
    }
})

// Middleware must be before the model compilation
// Annoyingly, middleware is tied to the method. So if we change findbyidanddelete, these would also have to change

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;