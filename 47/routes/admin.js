const express = require('express');
const router = express.Router();

// you can have router-specific middleware as well
router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next();
    }
    res.send('You arent no admin!');
})

router.get('/secret', (req, res) => {
    res.send('Secret')
})

router.get('/delete', (req, res) => {
    res.send('Delete things!')
})

module.exports = router;
