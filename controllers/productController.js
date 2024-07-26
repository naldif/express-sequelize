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

exports.readProducts = asyncHandle(async(req, res) => {
    const products = await Product.findAll();
    
    return res.status(200).json({
        data: products
    })
})

exports.detailProduct = asyncHandle(async (req, res) => {
    const id = req.params.id
    const productData = await Product.findByPk(id)

    if(!productData){
        res.status(404)
        throw new Error("Product id tidak ditemukan")
    }

    return res.status(200).json({
        data: productData
    })
})