const User = require('../models/user');

module.exports.registerForm = (req, res) => {
    res.render('users/register')
};

module.exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = new User({ email, username });
    try {
        const registeredUser = await User.register(user, password);
        // we should log the user in when they register!
        req.login(registeredUser, err => {
            if (err) {
                return next(e);
            }
            req.flash('success', 'Welcome! Successfully registered.');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
};

module.exports.loginForm = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    req.flash('success', `Welcome back ${req.body.username}`)
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Logged out!');
    res.redirect('/campgrounds');
};