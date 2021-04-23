const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');  // unique identifiers!
// this is restructuring w/ renaming
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// Remember, app.use runs on EVERY req
// This is the typical format for url forms
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))



// REST == representational state transfer
// CRUD == create, read, update, delete
// rest is essentially a set of rules for how to interact btwn client and server
// REST is a stateless protocol (no dep on t-1 req)

// example w/o a db for comments
// GET /comments for all comments
// POST /comments to create a new one
// GET /comments/:id to get a specific one
// PATCH /commnts/:id to update a specific comment
// DELETE /comments/:id to delete a comment
let comments = [
    {
        'id': uuid(), // uuid creates a long unique identifier every call
        'username': 'Chasen',
        'comment': 'hi'
    },
    {
        'id': uuid(),
        'username': 'Joe',
        'comment': 'bye'
    },
    {
        'id': uuid(),
        'username': 'Gulch',
        'comment': 'yo I am gulch gulch'
    },
]
/////// Restful routes ///////
// index
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

// new
// This is the form, which then posts to /comments
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

// create
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ id: uuid(), username, comment })
    // Typically a post will redirect!
    // Default is 302 resp, then browser makes a get to the redirect path
    res.redirect('/comments')
})

// show
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
})

// update
// Put vs. patch -- put updates everything (ie. overwrites the full payload)
// patch only partially modifies
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);  // the old comment

    const newComment = req.body.comment; // payload to replace
    comment.comment = newComment;
    res.redirect('/comments')
})

// edit
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

// delete
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments')
})






// Unreleated get / post routes
app.get('/tacos', (req, res) => {
    res.send('getting tacos')
})

app.post('/tacos', (req, res) => {
    // post contains req.body!
    // console.log(req.body)

    // but its undefined? Woah! By default. which is odd.
    // Undefined until parsed by the middleware
    const { meat, qty } = req.body;

    res.send(`posting ${qty} ${meat} tacos`)
})


app.listen(3000, () => {
    console.log('started')
})