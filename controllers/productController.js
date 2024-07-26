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
    } = req.body

    const file = req.file;
    // validasi jika file tidak di input
    if(!file) {
        res.status(400)
        throw new Error("Tidak ada image yang di input")
    }

    const fileName = file.filename
    const pathFile = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`

    const newProduct = await Product.create(
        {
            name,
            description, 
            price,
            categoryId,
            stock,
            image: pathFile,
        }
    )

    return res.status(200).json({
        data: newProduct
    })
})