const express = require('express')
const router = express.Router()
const { getAllCategories, storeCategory, detailCategory, updateCategory, deleteCategory } = require('../controllers/categoryController')
const { authMiddleware } = require('../middleware/UserMiddleware')

router.get('/', getAllCategories)

router.post('/', storeCategory)
router.get('/:id', authMiddleware, detailCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

router.get('/filterData',(req, res) => {
    res.send('route filter data')
})

router.get('/:nama', (req, res) => {
    res.send(`parameter ${req.params.nama}`)
})

module.exports = router
