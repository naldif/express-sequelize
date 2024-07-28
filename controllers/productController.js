const asyncHandle = require('../middleware/asyncHandle')
const {
    Product
} = require('../models')
const fs = require('fs')
const {
    Op
} = require("sequelize")

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
    if (!file) {
        res.status(400)
        throw new Error("Tidak ada image yang di input")
    }

    const fileName = file.filename
    const pathFile = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`

    const newProduct = await Product.create({
        name,
        description,
        price,
        categoryId,
        stock,
        image: pathFile,
    })

    return res.status(200).json({
        data: newProduct
    })
})

exports.readProducts = asyncHandle(async (req, res) => {

    const {
        search,
        limit,
        page
    } = req.query

    let productData = ""
    if (search || limit || page) {
        const pageData = page * 1 || 1
        const limitData = limit * 1 || 100 
        const offsetData = (pageData - 1) * limitData
        const searchData = search || ""
        
        const products = await Product.findAndCountAll({
            limit : limitData,
            offset : offsetData,
            where: {
                name: {
                    [Op.like]: "%" + searchData + "%"
                }
            }
        });

        productData = products
    } else {
        const product = await Product.findAndCountAll()
        productData = product
    }


    return res.status(200).json({
        data: productData
    })
})

exports.detailProduct = asyncHandle(async (req, res) => {
    const id = req.params.id
    const productData = await Product.findByPk(id)

    if (!productData) {
        res.status(404)
        throw new Error("Product id tidak ditemukan")
    }

    return res.status(200).json({
        data: productData
    })
})

exports.updateProduct = asyncHandle(async (req, res) => {

    // request params & req bodt
    const idParams = req.params.id
    let {
        name,
        price,
        description,
        stock,
        categoryId
    } = req.body

    // get data by id
    const productData = await Product.findByPk(idParams)

    if (!productData) {
        res.status(404)
        throw new Error("Product id tidak ditemukan")
    }

    // request file
    const file = req.file

    // kondisi jika file gambar di ganti/ diupdate
    if (file) {
        // ambil file image yang lama
        const nameImage = productData.image.replace(`${req.protocol}://${req.get('host')}/public/uploads/`, "")
        // tempat file lama
        const filePath = `./public/uploads/${nameImage}`
        // fungsi hapus file
        fs.unlink(filePath, (err) => {
            if (err) {
                res.status(400)
                throw new Error("File tidak ditemukan")
            }
        })

        const fileName = file.filename
        const pathFile = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`

        productData.image = pathFile
    }

    productData.name = name || productData.name
    productData.price = price || productData.price
    productData.description = description || productData.description
    productData.stock = stock || productData.stock
    productData.categoryId = categoryId || productData.categoryId

    productData.save();

    return res.status(200).json({
        message: "Berhasil update product",
        data: productData
    })
})

exports.destroyProduct = asyncHandle(async (req, res) => {

    const idParams = req.params.id
    // get data product berdasarkan id
    const productData = await Product.findByPk(idParams)

    if (productData) {
        // ambil file image yang lama
        const nameImage = productData.image.replace(`${req.protocol}://${req.get('host')}/public/uploads/`, "")
        // tempat file lama
        const filePath = `./public/uploads/${nameImage}`
        // fungsi hapus file
        fs.unlink(filePath, (err) => {
            if (err) {
                res.status(400)
                throw new Error("File tidak ditemukan")
            }
        })

        productData.destroy();

        return res.status(200).json({
            message: "Data berhasil dihapus"
        })
    } else {
        res.status(404);
        throw new Error("Product Id tidak ditemukan")
    }
})