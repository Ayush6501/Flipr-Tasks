const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.get('/:body/:coll1/:coll2', (req, res) => {
    res.send(req.params.body)
})
module.exports = router
