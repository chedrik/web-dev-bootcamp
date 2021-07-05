const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/bcrypt', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

mongoose.connection.on('error', console.error.bind(console, 'Error connecting to mongodb:'));
mongoose.connection.once('open', () => {
    console.log('Successfully connected to mongodb')
})

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'oh-so-secret' }));

// Login protecting middleware
const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    next();
}

app.get('/', (req, res) => {
    res.send('homepage');
})

app.get('/register', (req, res) => {
    res.render('register');
})

// We definitely dont want the PW in a query string
app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    // const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username: username,
        password: password, // plaintext here, but the model save will hash!
    })

    await user.save();

    res.redirect('/')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    const { password, username } = req.body;
    // const user = await User.findOne({ username });
    // naive; no error handling
    // const valid = await bcrypt.compare(password, user.password);

    // model method instead
    const user = await User.findAndValidate(username, password);
    if (user) {
        // Store the logged-in-ness w/ a session cookie
        req.session.user_id = user._id;  // we can now check this elsewhere
        res.send('yay')
    } else {
        res.send('incorrect pass / user combo');
    }
})

// how to logout? Just remove the session user id
app.post('/logout', (req, res) => {
    req.session.user_id = null;
    // alternatively, you can clear the whole session
    // req.session.destroy()

    res.redirect('/login')
})

app.get('/secret', (req, res) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    res.render('secret');
})

// better way to protecdt w/ a mw!
app.get('/secretmw', requireLogin, (req, res) => {
    res.send('secret protected by middleware!')
})


app.listen(3000, () => {
    console.log('Listening')
})