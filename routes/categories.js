const express = require('express')
const router = express.Router()
const { getAllCategories, storeCategory, detailCategory, updateCategory, deleteCategory } = require('../controllers/categoryController')
const { authMiddleware, permissionUser } = require('../middleware/UserMiddleware')

router.get('/', getAllCategories)
router.post('/', authMiddleware, permissionUser("admin"), storeCategory)
router.put('/:id', authMiddleware, permissionUser("admin"), updateCategory)
router.delete('/:id', authMiddleware, permissionUser("admin"), deleteCategory)
router.get('/:id', detailCategory)

router.get('/filterData',(req, res) => {
    res.send('route filter data')
})

router.get('/:nama', (req, res) => {
    res.send(`parameter ${req.params.nama}`)
})

module.exports = router
