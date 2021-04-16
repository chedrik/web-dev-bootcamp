const express = require('express');
const app = express();
const path = require('path'); // included in express


// middleware to serve static files!
// use is 'used' on every request
// same potential path issue, so use abs path
app.use(express.static(path.join(__dirname, 'public')))


const redditData = require('./data.json');  // simulate db 

// No need to explicitly require, express does this behind the scenes
// We do need to install though
// Default assumption is template is in /views
app.set('view engine', 'ejs');

// Problem: /views default only works if you run from the main directory
// Let's set it relative to this index.js instead of pwd/views
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    // res.send('hi')
    // How do we render a view? res.render!
    // dont need to specificy .ejs or views/ due to defaults
    res.render('home') // name of file

})

app.get('/r/:subreddit', (req, res) => {
    const sub = req.params.subreddit;
    const data = redditData[sub];
    if (data) {
        res.render('subreddit', { ...data })  // spread the data
    } else {
        res.send(`No subreddit! ${sub}`)
    }
})

app.get('/rand', (req, res) => {
    const randoNum = Math.floor(Math.random() * 10) + 1;
    const arr = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1]
    // You can pass values to the template!
    res.render('random', { rand: randoNum, arr: arr })
})


app.listen(3000, () => {
    console.log('Listening...')
})