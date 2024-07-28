const express = require('express')
const router = express.Router()
const {
    addProduct,
    readProducts,
    detailProduct,
    updateProduct,
    destroyProduct
} = require('../controllers/productController')
const { uploadOption } = require('../utils/fileUpload')
const { authMiddleware, permissionUser } = require('../middleware/UserMiddleware')

router.get('/', readProducts)
router.post('/', uploadOption.single('image'), authMiddleware, permissionUser("admin"), addProduct)
router.get('/:id', authMiddleware, detailProduct)
router.put('/:id', uploadOption.single('image'), authMiddleware, permissionUser("admin"), updateProduct)
router.delete('/:id', authMiddleware, permissionUser("admin"), destroyProduct)

module.exports = router