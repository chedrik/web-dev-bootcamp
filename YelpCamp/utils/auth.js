module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {  // fcn is included in all req by passport!
        req.flash('error', 'You must be signed in.');
        req.session.returnTo = req.originalUrl;  // for redirect!
        return res.redirect('/login');
    }
    next();
}
