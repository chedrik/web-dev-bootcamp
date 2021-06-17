const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/product');
const Farm = require('./models/farm');

mongoose.connect('mongodb://localhost:27017/farmStand',
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Mongo connection open')
    }).catch(err => {
        console.log(`${err} occurred while connecting to mongod!`)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


const categories = ['Fruit', 'Vegetable', 'Dairy']

// FARM ROUTES

app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms })
})

app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})

app.get('/farms/:id', async (req, res) => {
    const { id } = req.params;
    // we want to populate the products here!
    const farm = await Farm.findById(id).populate('products');
    res.render('farms/show', { farm: farm })
})

app.post('/farms', async (req, res) => {
    const item = new Farm(req.body);
    await item.save();
    res.redirect(`/farms`)
})

// Need the farm id in order to assosciate!
app.get('/farms/:id/products/new', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', { categories, farm })
})

app.post('/farms/:id/products', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });

    // Need to assosciate farm <----> product!
    farm.products.push(product);
    product.farm = farm;
    // ^ note the 2 way relationship here.
    await farm.save();
    await product.save();

    res.redirect(`/farms/${id}`)
})

// how to deal w/ deletion and the reflationships?
app.delete('/farms/:id', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findByIdAndDelete(id);
    // we could search for all items related to farm and delete manually
    
    res.redirect('/farms')
})




// this is a common pattern, async -> await a fetch
app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category }).populate('farm');
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({}).populate('farm');
        res.render('products/index', { products, category: 'All' })
    }
})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('farm');
    res.render('products/show', { product: product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true }); // again, naive to pass all of the body
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products')
})

app.post('/products', async (req, res) => {
    const item = new Product(req.body);  // this is a naive approach w/o sanitizing
    await item.save();
    res.redirect(`/products/${item._id}`)
})

app.listen(3000, () => {
    console.log('Listening on port 3k')
})