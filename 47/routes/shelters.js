// Pattern for routers

const express = require('express');

// router instead of app V
const router = express.Router();


// to actually visit these, you need to prepend /shelters
// based on the router implementation in the index
router.get('/', (req, res) => {
    res.send('All shelters!')
})

router.get('/:id', (req, res) => {
    res.send('A single shelter')
})

router.get('/:id/edit', (req, res) => {
    res.send('Editing a single shelter')
})

module.exports = router;