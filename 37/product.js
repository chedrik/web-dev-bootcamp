const mongoose = require('mongoose');

// The last part is the db name to connect to
mongoose.connect('mongodb://localhost:27017/shopApp',
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Connection open')
    }).catch(err => {
        console.log(`${err} occurred!`)
    })

const productSchema = new mongoose.Schema({
    // Shorthand
    // name: String,
    // price: Number,

    // full version
    // there are general constraints, as well as constraints by dtype
    name: {
        type: String,
        required: true, // false by default
    },
    price: {
        type: Number,
        // custom error message for validators
        min: [0, 'no free stuff!']
    },
    onSale: {
        type: Boolean,
        default: false,
    },
    //array
    categories: {
        type: [String],
        default: ['uncategorized']
    },
    // nested document
    qty: {
        online: {
            type: Number,
            default: 0
        },
        store: {
            type: Number,
            default: 0
        }
    }
})

// instance methods. dont use arrow fcn!
// call from the instance itself
productSchema.methods.greet = function () {
    console.log(`Hello from ${this.name}`)
}

// static method (on the model itself!)
// call from the model itself
productSchema.statics.firesale = function () {
    //this refers to the model now
    return this.updateMany({}, { onSale: true, price: 0 })
}
// Product.firesale()


const Product = mongoose.model('Product', productSchema);

const bike = new Product({
    name: 'Schwinn', price: 599, categories: ['fun', 'new'],
    qty: { 'online': 5, 'store': 0 }
})
bike.save().then(data => {
    console.log('Saved bike!')
}).catch(err => {
    console.log(`Did not save bike due to ${err}`)
})

// This fails due to the 'required' tag!
const trike = new Product({ price: 399 })
trike.save().then(data => {
    console.log('Saved trike!')
}).catch(err => {
    console.log(`Did not save trike due to ${err}`)
})

// This fails due to the price not converting to number tag!
const ski = new Product({ price: 'not price' }) // this would work with '5' because it tries to type convert
ski.save().then(data => {
    console.log('Saved ski!')
}).catch(err => {
    console.log(`Did not save ski due to ${err}`)
})

// Extra information outside of the Schema will not cause an exception,
// but it wont be saved into the db

// need to set runValidators -> true, otherwise they only apply on creation
Product.findOneAndUpdate({ name: 'Schwinn' }, { price: -10 }, { new: true, runValidators: true })
    .then(data => {
        console.log('Updated it')
    })
    .catch(err => {
        console.log(`${err} occurred`)
    })


const findProduct = async () => {
    const found = await Product.findOne({ name: 'Schwinn' });
    found.greet();
}

findProduct();