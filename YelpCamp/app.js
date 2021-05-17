const express = require('express');
const app = express();
const path = require('path');

// middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// routes
app.get('/', (req, res) => {
    res.render('home')
})



app.listen(3000, () => {
    console.log('Express app started on port 3000')
})