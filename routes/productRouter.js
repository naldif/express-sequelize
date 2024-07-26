const express = require('express')
const router = express.Router()
const {
    addProduct,
    readProducts,
    detailProduct,
    updateProduct
} = require('../controllers/productController')
const { uploadOption } = require('../utils/fileUpload')

router.post('/', uploadOption.single('image'), addProduct)

router.get('/', readProducts)
router.get('/:id', detailProduct)
router.put('/:id', uploadOption.single('image'), updateProduct)

module.exports = router