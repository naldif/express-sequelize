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

router.post('/', uploadOption.single('image'), addProduct)

router.get('/', readProducts)
router.get('/:id', detailProduct)
router.put('/:id', uploadOption.single('image'), updateProduct)
router.delete('/:id', destroyProduct)

module.exports = router