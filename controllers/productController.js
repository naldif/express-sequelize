const asyncHandle = require('../middleware/asyncHandle')
const {
    Product
} = require('../models')

exports.addProduct = asyncHandle(async (req, res) => {
    let {
        name,
        description,
        price,
        categoryId,
        stock,
        image
    } = req.body

    const newProduct = await Product.create(
        {
            name,
            description,
            price,
            categoryId,
            stock,
            image,
        }
    )
})