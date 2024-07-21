const express = require('express')
const router = express.Router()
const { getAllCategories, storeCategory, detailCategory } = require('../controllers/categoryController')

router.get('/', getAllCategories)

router.post('/', storeCategory)
router.get('/:id', detailCategory)

router.get('/filterData',(req, res) => {
    res.send('route filter data')
})

router.get('/:nama', (req, res) => {
    res.send(`parameter ${req.params.nama}`)
})

module.exports = router
