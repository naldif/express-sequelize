const express = require('express')
const router = express.Router()
const {
    addProduct,
    readProducts,
    detailProduct
} = require('../controllers/productController')
const { uploadOption } = require('../utils/fileUpload')

router.post('/', uploadOption.single('image'), addProduct)

router.get('/', readProducts)
router.get('/:id', detailProduct)

module.exports = router