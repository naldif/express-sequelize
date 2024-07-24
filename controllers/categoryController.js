const {
    Category
} = require("../models")
const asyncHandle = require('../middleware/asyncHandle')

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();

        return res.status(200).json({
            status: "success",
            data: categories
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            error: "Server down"
        })
    }
}

exports.storeCategory = asyncHandle(async (req, res) => {

    let {
        name,
        description
    } = req.body
    const newCategory = await Category.create({
        name,
        description
    })

    res.status(200).json({
        status: "success",
        data: newCategory
    })
})

exports.updateCategory = asyncHandle(async (req, res) => {

    const id = req.params.id
    await Category.update(req.body, {
        where: {
            id: id
        }
    });
    const findCategory = await Category.findByPk(id);
    if (!findCategory) {
        res.status(404);
        throw new Error("Category tidak ditemukan")
    }
    res.status(200).json({
        status: "success",
        data: findCategory
    })

})

exports.detailCategory = async (req, res) => {

    try {
        const detailCategory = await Category.findByPk(req.params.id);
        if (!detailCategory) {
            return res.status(404).json({
                status: "fail",
                message: "Data tidak di temukan"
            })
        }
        res.status(200).json({
            status: "success",
            data: detailCategory
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            error: 'server down'
        })
    }
}

exports.deleteCategory = async (req, res) => {

    const id = req.params.id
    const category = await Category.findByPk(id)
    if (!category) {
        return res.status(404).json({
            status: "fail",
            message: "Data tidak di temukan"
        })
    }

    await Category.destroy({
        where: {
            id
        }
    });
    return res.status(200).json({
        status: "success",
        message: `Data dengan id ${id} berhasil di hapus`
    })


}